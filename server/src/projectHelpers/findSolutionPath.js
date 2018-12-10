const { configResolver, sanitizeFolderName } = require('../utils/ioHelpers');
const { PROJECTS_DIR, MODEL_DB } = require('../config');
const path = require('path');

async function findSolutionPath({ stageId, codeFileId }) {
  const codeFile = await configResolver(MODEL_DB.CODE_FILES, codeFileId);
  const stage = await configResolver(MODEL_DB.STAGES, stageId);
  const sc = await configResolver(MODEL_DB.STAGE_CONTAINERS, stage.containerId);
  const scg = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, sc.stageContainerGroupId);

  const filePath = (codeFile.executablePath || codeFile.name);

  return path.join(PROJECTS_DIR,
    sanitizeFolderName(scg.title),
    sanitizeFolderName(sc.version),
    sanitizeFolderName(stage.title),
    filePath);
}

module.exports = findSolutionPath;
