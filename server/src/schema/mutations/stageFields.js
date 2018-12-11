const { findStageFilePath } = require('../../projectHelpers');
const { StageType } = require('../models');
const { configWriter, fileWriter, configResolver, fileRemove } = require('../../utils/ioHelpers');
const { LOOKUP_KEY, MODEL_DB } = require('../../config');
const { ObjectID } = require('mongodb');
const path = require('path');
const fs = require('fs-extra');
const destroyStage = require('./stage/destroy');
const createStage = require('./stage/create');
const reportWrapper = require('./reportWrapper');
const stageProjectProps = require('./stage/projectProps');
const {
  GraphQLList,
  GraphQLString,
} = require('graphql');

const stageArgs = {
  id: { type: GraphQLString },
  containerId: { type: GraphQLString },
  codeFileIds: { type: new GraphQLList(GraphQLString) },
  title: { type: GraphQLString },
  abiValidations: { type: GraphQLString },
  task: { type: GraphQLString },
  details: { type: GraphQLString },
}

module.exports = {
  destroyStage: {
    type: StageType,
    args: {
      id: { type: GraphQLString },
    },
    resolve: (_, { id }) => reportWrapper(destroyStage)(id),
  },
  createStage: {
    type: StageType,
    args: stageArgs,
    resolve: (_, props) => reportWrapper(createStage)(props),
  },
  modifyStage: {
    type: StageType,
    args: stageArgs,
    async resolve (_, props) {
      const stage = await configResolver(MODEL_DB.STAGES, props.id);
      const merged = { ...stage, ...props };

      const newBasePath = await findStageFilePath(merged);
      const previousBasePath = await findStageFilePath(stage);

      if(newBasePath !== previousBasePath) {
        await fs.rename(previousBasePath, newBasePath)
      }

      const keys = Object.keys(props);
      for(let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(stageProjectProps[key]) {
          const filePath = path.join(newBasePath, stageProjectProps[key]);
          await fileWriter(filePath, merged[key]);
          merged[key] = LOOKUP_KEY;
        }
      }

      return configWriter(MODEL_DB.STAGES, merged);
    }
  },
}
