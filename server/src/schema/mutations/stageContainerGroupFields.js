const { StageContainerGroupType } = require('../models');
const { configWriter, configResolver } = require('../../utils/ioHelpers');
const { findStageContainerGroupFilePath } = require('../../projectHelpers');
const { MODEL_DB } = require('../../config');
const { ObjectID } = require('mongodb');
const fs = require('fs-extra');
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
  createStageContainerGroup: {
    type: StageContainerGroupType,
    args: stageContainerGroupArgs,
    async resolve (_, props) {
      const stageContainerGroupId = ObjectID().toString();
      const stageContainerGroup = await configWriter(MODEL_DB.STAGE_CONTAINER_GROUPS, {
        id: stageContainerGroupId,
        title: 'Untitled',
        containerType: props.containerType,
        ...props,
      });
      const stageContainer = await configWriter(MODEL_DB.STAGE_CONTAINERS, {
        id: ObjectID().toString(),
        type: props.containerType,
        stageContainerGroupId,
        version: 'TBD',
      });
      return {
        ...stageContainerGroup,
        stageContainers: [stageContainer]
      }
    }
  }
}
