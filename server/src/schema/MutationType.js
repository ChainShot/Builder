const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');
const CodeFileType = require('./CodeFileType');
const StageContainerGroupType = require('./StageContainerGroupType');
const StageContainerType = require('./StageContainerType');
const StageType = require('./StageType');
const { dbWriter, fileWriter, dbResolver, fileRemove } = require('./utils');
const codeFileLookup = require('./lookups/codeFileLookup');
const stageContainerLookup = require('./lookups/stageContainerLookup');
const stageLookup = require('./lookups/stageLookup');
const { LOOKUP_KEY, MODEL_DB } = require('../config');
const { ObjectID } = require('mongodb');

const codeFileProjectProps = {
  initialCode: codeFileLookup
}

const stageContainerProjectProps = {
  intro: stageContainerLookup
}

const stageProjectProps = {
  abiValidation: stageLookup,
  task: stageLookup,
  details: stageLookup,
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

const stageContainerArgs = {
  id: { type: GraphQLString },
  version: { type: GraphQLString },
  intro: { type: GraphQLString },
}

const stageArgs = {
  id: { type: GraphQLString },
  abiValidation: { type: GraphQLString },
  task: { type: GraphQLString },
  details: { type: GraphQLString },
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
    modifyStage: {
      type: StageType,
      args: stageArgs,
      async resolve (_, props) {
        const stage = await dbResolver(MODEL_DB.STAGES, props.id);
        const merged = { ...stage, ...props };

        const keys = Object.keys(props);
        for(let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if(stageProjectProps[key]) {
            // remove the previous path (TODO: check and only do if changed)
            const previousPath = await stageProjectProps[key](stage, `${key}.md`);
            await fileRemove(previousPath);
            // add the new path
            const newPath = await stageProjectProps[key](merged, `${key}.md`);
            await fileWriter(newPath, merged[key]);
            merged[key] = LOOKUP_KEY;
          }
        }

        return dbWriter(MODEL_DB.STAGES, merged);
      }
    },
    modifyStageContainer: {
      type: StageContainerType,
      args: stageContainerArgs,
      async resolve (_, props) {
        const stageContainer = await dbResolver(MODEL_DB.STAGE_CONTAINERS, props.id);
        const merged = { ...stageContainer, ...props };

        const keys = Object.keys(props);
        for(let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if(stageContainerProjectProps[key]) {
            // remove the previous path (TODO: check and only do if changed)
            const previousPath = await stageContainerProjectProps[key](stageContainer, `${key}.md`);
            await fileRemove(previousPath);
            // add the new path
            const newPath = await stageContainerProjectProps[key](merged, `${key}.md`);
            await fileWriter(newPath, merged[key]);
            merged[key] = LOOKUP_KEY;
          }
        }

        return dbWriter(MODEL_DB.STAGE_CONTAINERS, merged);
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