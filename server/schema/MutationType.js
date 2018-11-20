const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');
const CodeFileType = require('./CodeFileType');
const StageContainerGroupType = require('./StageContainerGroupType');
const { dbWriter, fileWriter, dbResolver, fileRemove } = require('./utils');
const codeFileLookup = require('./lookups/codeFileLookup');
const { LOOKUP_KEY, MODEL_DB } = require('../config');
const { ObjectID } = require('mongodb');

const codeFileProjectProps = {
  initialCode: codeFileLookup
}

const codeFileMutationArgs = {
  id: { type: GraphQLString },
  name: { type: GraphQLString },
  executable: { type: GraphQLBoolean },
  executablePath: { type: GraphQLString },
  fileLocation: { type: GraphQLString },
  hasProgress: { type: GraphQLBoolean },
  mode: { type: GraphQLString },
  readOnly: { type: GraphQLBoolean },
  testFixture: { type: GraphQLBoolean },
  visible: { type: GraphQLBoolean },
  codeStageIds: { type: new GraphQLList(GraphQLString) },
  initialCode: { type: GraphQLString },
}

const stageContainerGroupArgs = {
  id: { type: GraphQLString },
  title: { type: GraphQLString },
  description: { type: GraphQLString },
  containerType: { type: GraphQLString },
}

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createStageContainerGroup: {
      type: StageContainerGroupType,
      args: stageContainerGroupArgs,
      async resolve (_, props) {
        return dbWriter(MODEL_DB.STAGE_CONTAINER_GROUPS, {
          id: ObjectID().toString(),
          title: 'Untitled',
          ...props
        });
      }
    },
    createCodeFile: {
      type: CodeFileType,
      args: codeFileMutationArgs,
      async resolve (_, props) {
        const keys = Object.keys(props);
        for(let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if(codeFileProjectProps[key]) {
            const paths = await codeFileProjectProps[key](props);
            await Promise.all(paths.map(async (path) => {
              return await fileWriter(path, props[key]);
            }));
            props[key] = LOOKUP_KEY;
          }
        }
        return dbWriter(MODEL_DB.CODE_FILES, props);
      }
    },
    modifyCodeFile: {
      type: CodeFileType,
      args: codeFileMutationArgs,
      async resolve (_, props) {
        const codeFile = await dbResolver(MODEL_DB.CODE_FILES, props.id);
        const merged = { ...codeFile, ...props };

        const keys = Object.keys(props);
        for(let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if(codeFileProjectProps[key]) {
            // remove the previous path (TODO: check and only do if not in new paths)
            const previousPaths = await codeFileProjectProps[key](codeFile);
            await Promise.all(previousPaths.map(async (path) => {
              return await fileRemove(path);
            }));
            // add the new path
            const paths = await codeFileProjectProps[key](merged);
            await Promise.all(paths.map(async (path) => {
              return await fileWriter(path, merged[key]);
            }));
            merged[key] = LOOKUP_KEY;
          }
        }

        return dbWriter(MODEL_DB.CODE_FILES, merged);
      }
    }
  }
})

module.exports = MutationType;
