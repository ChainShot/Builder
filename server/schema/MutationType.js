const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');
const CodeFileType = require('./CodeFileType');
const { dbWriter, fileWriter, dbResolver } = require('./utils');
const { PROJECTS_DIR } = require('../config');
const path = require('path');

const codeFileProjectProps = {
  initialCode: ({ executable_path, test_fixture, code_stage_ids, name }) => {
    const ids = (code_stage_ids || []);
    return Promise.all(ids.map(async (id) => {
      const stage = await dbResolver('stages', id);
      const sc = await dbResolver('stage_containers', stage.container_id);
      const scg = await dbResolver('stage_container_groups', sc.stage_container_group_id);

      const basePath = path.join(PROJECTS_DIR, scg.title, sc.version, stage.title);
      let fullPath;
      if(executable_path) {
        fullPath = path.join(basePath, executable_path)
      }
      else if(test_fixture) {
        fullPath = path.join(basePath, 'test', name);
      }
      else if(stage.language === 'javascript') {
        fullPath = path.join(basePath, name);
      }
      else if(stage.language === 'solidity' || stage.language === 'vyper') {
        fullPath = path.join(basePath, 'contracts', name);
      }
      return fullPath;
    }));
  }
}

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    create: {
      type: CodeFileType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        executable: { type: GraphQLBoolean }
      },
      async resolve (_, props) {
        return dbWriter('code_files', props);
      }
    },
    modify: {
      type: CodeFileType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        executable: { type: GraphQLBoolean },
        initialCode: { type: GraphQLString },
      },
      async resolve (_, props) {
        const codeFile = await dbResolver('code_files', props.id);
        const keys = Object.keys(props);
        for(let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if(codeFileProjectProps[key]) {
            const paths = await codeFileProjectProps[key](codeFile);
            await paths.map(async (path) => {
              await fileWriter(path, props[key]);
            });
            props[key] = paths;
          }
        }
        const merged = { ...codeFile, ...props };
        return dbWriter('code_files', merged);
      }
    }
  }
})

module.exports = MutationType;
