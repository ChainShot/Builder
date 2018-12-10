const { findStageContainerFilePath } = require('../../projectHelpers');
const { StageContainerType } = require('../models');
const { configWriter, fileWriter, configResolver, fileRemove } = require('../../utils/ioHelpers');
const { LOOKUP_KEY, MODEL_DB } = require('../../config');
const fs = require('fs-extra');
const path = require('path');
const {
  GraphQLString,
} = require('graphql');

const scProjectPropNames = {
  intro: 'intro.md'
}

const stageContainerArgs = {
  id: { type: GraphQLString },
  version: { type: GraphQLString },
  type: { type: GraphQLString },
  intro: { type: GraphQLString },
}

module.exports = {
  modifyStageContainer: {
    type: StageContainerType,
    args: stageContainerArgs,
    async resolve (_, props) {
      const stageContainer = await configResolver(MODEL_DB.STAGE_CONTAINERS, props.id);
      const merged = { ...stageContainer, ...props };

      const newBasePath = await findStageContainerFilePath(merged);
      const previousBasePath = await findStageContainerFilePath(stageContainer);

      // if the version has changed, update the folder name
      if(newBasePath !== previousBasePath) {
        await fs.rename(previousBasePath, newBasePath)
      }

      // if any project files have updated, overwrite them
      const keys = Object.keys(props);
      for(let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(scProjectPropNames[key]) {
          const filePath = path.join(newBasePath, scProjectPropNames[key]);
          await fileWriter(filePath, merged[key]);
          merged[key] = LOOKUP_KEY;
        }
      }

      return configWriter(MODEL_DB.STAGE_CONTAINERS, merged);
    }
  },
}
