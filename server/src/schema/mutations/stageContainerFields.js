const { findStageContainerFilePath } = require('../../projectHelpers');
const { StageContainerType } = require('../models');
const { configWriter, fileWriter, configResolver, fileRemove } = require('../../utils/ioHelpers');
const destroyStageContainer = require('./stageContainer/destroy');
const stageContainerProjectProps = require('./stageContainer/projectProps');
const { LOOKUP_KEY, MODEL_DB } = require('../../config');
const fs = require('fs-extra');
const { ObjectID } = require('mongodb');
const path = require('path');
const {
  GraphQLString,
} = require('graphql');

const onChange = {
  type: async (stageContainer) => {
    const { stageContainerGroupId } = stageContainer;
    const stageContainerGroup = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, stageContainerGroupId);
    stageContainerGroup.containerType = stageContainer.type;
    await configWriter(MODEL_DB.STAGE_CONTAINER_GROUPS, stageContainerGroup);
  }
}

const stageContainerArgs = {
  id: { type: GraphQLString },
  version: { type: GraphQLString },
  stageContainerGroupId: { type: GraphQLString },
  type: { type: GraphQLString },
  intro: { type: GraphQLString },
}

module.exports = {
  destroyStageContainer: {
    type: StageContainerType,
    args: {
      id: { type: GraphQLString },
    },
    resolve: async (_, { id }) => destroyStageContainer(id),
  },
  createStageContainer: {
    type: StageContainerType,
    args: stageContainerArgs,
    async resolve (_, { stageContainerGroupId }) {
      const stageContainerGroup = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, stageContainerGroupId);
      const stageContainer = await configWriter(MODEL_DB.STAGE_CONTAINERS, {
        id: ObjectID().toString(),
        type: stageContainerGroup.containerType,
        stageContainerGroupId,
        version: 'TBD',
      });

      const basePath = await findStageContainerFilePath(stageContainer);
      const keys = Object.keys(stageContainerProjectProps);
      for(let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const value = stageContainerProjectProps[key];
          await fileWriter(path.join(basePath, key), value);
      }

      return stageContainer;
    }
  },
  modifyStageContainer: {
    type: StageContainerType,
    args: stageContainerArgs,
    async resolve (_, props) {
      const stageContainer = await configResolver(MODEL_DB.STAGE_CONTAINERS, props.id);
      const merged = { ...stageContainer, ...props };

      const newBasePath = await findStageContainerFilePath(merged);
      const previousBasePath = await findStageContainerFilePath(stageContainer);

      if(newBasePath !== previousBasePath) {
        if(await fs.exists(previousBasePath)) {
          await fs.rename(previousBasePath, newBasePath)
        }
      }

      const keys = Object.keys(props);
      for(let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if(onChange[key]) {
          await onChange[key](merged);
        }

        if(stageContainerProjectProps[key]) {
          const filePath = path.join(newBasePath, stageContainerProjectProps[key]);
          await fileWriter(filePath, merged[key]);
          merged[key] = LOOKUP_KEY;
        }
      }

      return configWriter(MODEL_DB.STAGE_CONTAINERS, merged);
    }
  },
}
