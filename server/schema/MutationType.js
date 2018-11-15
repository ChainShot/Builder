const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');
const CodeFileType = require('./CodeFileType');
const { dbWriter, fileWriter, dbResolver } = require('./utils');
const { PROJECT_DIR } = require('../config');
const path = require('path');

const codeFileProjectProps = {
  'initial_code': ({ code_stage_ids, name }) => {
    const ids = (code_stage_ids || []);
    return Promise.all(ids.map(id => dbResolver('stages', id)).then((stage) => {
      return dbResolver('stage_containers', stage.container_id).then((sc) => {
        return dbResolver('stage_container_groups', sc.stage_container_group_id).then((scg) => {
          // TODO: map out files based on the version
          return path.join(PROJECT_DIR, scg.title, sc.version, stage.title, 'contracts', name);
        });
      });
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
        executable: { type: GraphQLBoolean }
      },
      async resolve (_, props) {
        return dbResolver('code_files', props.id).then(async (codeFile) => {
          const keys = Object.keys(props);
          for(let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if(codeFileProjectProps[key]) {
              const path = await codeFileProjectProps[key](codeFile);
              props[key] = path;
              console.log(path);
              // await fileWriter(path, codeFile[key]);
            }
          }
          const merged = { ...codeFile, ...props };
          return dbWriter('code_files', merged);
        });
      }
    }
  }
})

module.exports = MutationType;
