const { configResolver } = require('../ioHelpers').dethunked;
const sanitizeFolderName = require('../utils/sanitizeFolderName');;
const assertProjectValue = require('./assertProjectValue');
const { PROJECTS_DIR, MODEL_DB } = require('../config');
const path = require('path');

// function works with either codeFile (the model) or codeFileId (the object id)
// it requires at least one of these two properties
async function findSolutionPath({ stageId, codeFileId, codeFile }) {
  codeFile = codeFile || await configResolver(MODEL_DB.CODE_FILES, codeFileId);
  const stage = await configResolver(MODEL_DB.STAGES, stageId);
  const sc = await configResolver(MODEL_DB.STAGE_CONTAINERS, stage.containerId);
  const scg = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, sc.stageContainerGroupId);

  const filePath = (codeFile.executablePath || codeFile.name);

  return path.join(PROJECTS_DIR,
    assertProjectValue(sanitizeFolderName(scg.title)),
    assertProjectValue(sanitizeFolderName(sc.version)),
    assertProjectValue(sanitizeFolderName(stage.title)),
    filePath);
}

module.exports = findSolutionPath;
