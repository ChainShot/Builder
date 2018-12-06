const { findStageFilePath } = require('../../projectHelpers');
const { StageType } = require('../models');
const { configWriter, fileWriter, configResolver, fileRemove } = require('../../utils/ioHelpers');
const { LOOKUP_KEY, MODEL_DB } = require('../../config');
const { ObjectID } = require('mongodb');
const path = require('path');
const {
  GraphQLString,
} = require('graphql');

const stageArgs = {
  id: { type: GraphQLString },
  containerId: { type: GraphQLString },
  title: { type: GraphQLString },
  abiValidations: { type: GraphQLString },
  task: { type: GraphQLString },
  details: { type: GraphQLString },
}

const stageProjectPropNames = {
  abiValidations: 'validations.json',
  task: 'task.md',
  details: 'details.md',
}

module.exports = {
  createStage: {
    type: StageType,
    args: stageArgs,
    async resolve (_, props) {
      props.id = ObjectID().toString();

      const filesToWrite = [];

      const keys = Object.keys(props);
      for(let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(stageProjectPropNames[key]) {
          const basePath = await findStageFilePath(props);
          const newPath = path.join(basePath, stageProjectPropNames[key]);
          filesToWrite.push({ path: newPath, contents: props[key] });
          props[key] = LOOKUP_KEY;
        }
      }

      await configWriter(MODEL_DB.STAGES, props);

      // write project files after creation so
      // the sockets config lookup can happen properly
      for(let i = 0; i < filesToWrite.length; i++) {
        const { path, contents } = filesToWrite[i];
        await fileWriter(path, contents);
      }

      return props;
    }
  },
  modifyStage: {
    type: StageType,
    args: stageArgs,
    async resolve (_, props) {
      const stage = await configResolver(MODEL_DB.STAGES, props.id);
      const merged = { ...stage, ...props };

      const keys = Object.keys(props);
      for(let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(stageProjectPropNames[key]) {
          // remove the previous path (TODO: check and only do if changed)
          const previousBasePath = await findStageFilePath(stage);
          const previousPath = path.join(previousBasePath, stageProjectPropNames[key]);
          await fileRemove(previousPath);
          // add the new path
          const newBasePath = await findStageFilePath(merged);
          const newPath = path.join(newBasePath, stageProjectPropNames[key]);
          await fileWriter(newPath, merged[key]);
          merged[key] = LOOKUP_KEY;
        }
      }

      return configWriter(MODEL_DB.STAGES, merged);
    }
  },
}
