const { configResolver } = require('../ioHelpers').dethunked;
const sanitizeFolderName = require('../utils/sanitizeFolderName');
const { PROJECTS_DIR, MODEL_DB, INITIAL_CODE_DIR } = require('../config');
const path = require('path');

const findCodeFilePaths = ({ codeStageIds, name, executablePath, hasProgress }) => {
  const ids = (codeStageIds || []);
  return Promise.all(ids.map(async (id) => {
    const stage = await configResolver(MODEL_DB.STAGES, id);
    const sc = await configResolver(MODEL_DB.STAGE_CONTAINERS, stage.containerId);
    const scg = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, sc.stageContainerGroupId);

    const relativePath = hasProgress ? path.join(INITIAL_CODE_DIR, name) : executablePath;

    return path.join(PROJECTS_DIR,
      sanitizeFolderName(scg.title),
      sanitizeFolderName(sc.version),
      sanitizeFolderName(stage.title),
      relativePath);
  }));
}

module.exports = findCodeFilePaths;
