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

      const keys = Object.keys(props);
      for(let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(scProjectPropNames[key]) {
          // remove the previous path (TODO: check and only do if changed)
          const previousBasePath = await findStageContainerFilePath(stageContainer);
          const previousPath = path.join(basePath, scProjectPropNames[key]);
          await fileRemove(previousPath);
          // add the new path
          const newBasePath = await findStageContainerFilePath(merged);
          const newPath = path.join(merged, scProjectPropNames[key]);
          await fileWriter(newPath, merged[key]);
          merged[key] = LOOKUP_KEY;
        }
      }

      if(props.version) {
        console.log('version changed!');
        // fs.rename()
      }

      return configWriter(MODEL_DB.STAGE_CONTAINERS, merged);
    }
  },
}
