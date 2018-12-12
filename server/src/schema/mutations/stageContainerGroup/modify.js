const { configWriter, configResolver } = require('../../../utils/ioHelpers');
const { findStageContainerGroupFilePath } = require('../../../projectHelpers');
const { MODEL_DB } = require('../../../config');
const fs = require('fs-extra');

async function modifyStageContainerGroup(props) {
  const stageContainerGroup = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, props.id);
  const merged = { ...stageContainerGroup, ...props };

  const newBasePath = await findStageContainerGroupFilePath(merged);
  const previousBasePath = await findStageContainerGroupFilePath(stageContainerGroup);

  if(newBasePath !== previousBasePath) {
    await fs.rename(previousBasePath, newBasePath)
  }

  return configWriter(MODEL_DB.STAGE_CONTAINER_GROUPS, merged);
}

module.exports = modifyStageContainerGroup;
