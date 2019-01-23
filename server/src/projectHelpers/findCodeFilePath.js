const { configResolver } = require('../ioHelpers').dethunked;
const sanitizeFolderName = require('../utils/sanitizeFolderName');
const assertProjectValue = require('./assertProjectValue');
const { PROJECTS_DIR, MODEL_DB, INITIAL_CODE_DIR } = require('../config');
const path = require('path');

const findCodeFilePath = async (stageId, { name, executablePath, hasProgress }) => {
  const stage = await configResolver(MODEL_DB.STAGES, stageId);
  const sc = await configResolver(MODEL_DB.STAGE_CONTAINERS, stage.containerId);
  const scg = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, sc.stageContainerGroupId);

  const relativePath = hasProgress ? path.join(INITIAL_CODE_DIR, name) : executablePath;

  return path.join(PROJECTS_DIR,
    assertProjectValue(sanitizeFolderName(scg.title)),
    assertProjectValue(sanitizeFolderName(sc.version)),
    assertProjectValue(sanitizeFolderName(stage.title)),
    relativePath);
}

module.exports = findCodeFilePath;
