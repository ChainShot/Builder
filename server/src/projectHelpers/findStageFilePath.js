const { configResolver } = require('../ioHelpers').dethunked;
const sanitizeFolderName = require('../utils/sanitizeFolderName');
const { PROJECTS_DIR, MODEL_DB } = require('../config');
const path = require('path');

const findStageFilePath = async (stage) => {
  const sc = await configResolver(MODEL_DB.STAGE_CONTAINERS, stage.containerId);
  const scg = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, sc.stageContainerGroupId);

  return path.join(PROJECTS_DIR,
    sanitizeFolderName(scg.title),
    sanitizeFolderName(sc.version),
    sanitizeFolderName(stage.title));
}

module.exports = findStageFilePath;
