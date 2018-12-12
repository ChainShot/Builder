const stageContainerProjectProps = require('./projectProps');
const { LOOKUP_KEY, MODEL_DB } = require('../../../config');
const fs = require('fs-extra');
const path = require('path');

module.exports = ({ configWriter, fileWriter, configResolver }, { findStageContainerFilePath }) => {
  const onChange = {
    type: async (stageContainer) => {
      const { stageContainerGroupId } = stageContainer;
      const stageContainerGroup = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, stageContainerGroupId);
      stageContainerGroup.containerType = stageContainer.type;
      await configWriter(MODEL_DB.STAGE_CONTAINER_GROUPS, stageContainerGroup);
    }
  }

  async function modifyStageContainer(props) {
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

  return modifyStageContainer;
}
