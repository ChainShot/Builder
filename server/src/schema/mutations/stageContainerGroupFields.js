const { StageContainerGroupType } = require('../models');
const { configWriter, configResolver } = require('../../utils/ioHelpers');
const { findStageContainerGroupFilePath } = require('../../projectHelpers');
const { MODEL_DB } = require('../../config');
const destroyStageContainerGroup = require('./stageContainerGroup/destroy');
const createStageContainerGroup = require('./stageContainerGroup/create');
const fs = require('fs-extra');
const reportWrapper = require('./reportWrapper');
const {
  GraphQLString,
} = require('graphql');

const stageContainerGroupArgs = {
  id: { type: GraphQLString },
  title: { type: GraphQLString },
  description: { type: GraphQLString },
  containerType: { type: GraphQLString },
}

module.exports = {
  destroyStageContainerGroup: {
    type: StageContainerGroupType,
    args: {
      id: { type: GraphQLString },
    },
    resolve: (_, { id }) => reportWrapper(destroyStageContainerGroup)(id),
  },
  createStageContainerGroup: {
    type: StageContainerGroupType,
    args: stageContainerGroupArgs,
    resolve: (_, props) => reportWrapper(createStageContainerGroup)(props),
  },
  modifyStageContainerGroup: {
    type: StageContainerGroupType,
    args: stageContainerGroupArgs,
    async resolve (_, props) {
      const stageContainerGroup = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, props.id);
      const merged = { ...stageContainerGroup, ...props };

      const newBasePath = await findStageContainerGroupFilePath(merged);
      const previousBasePath = await findStageContainerGroupFilePath(stageContainerGroup);

      if(newBasePath !== previousBasePath) {
        await fs.rename(previousBasePath, newBasePath)
      }

      return configWriter(MODEL_DB.STAGE_CONTAINER_GROUPS, merged);
    }
  },
}
