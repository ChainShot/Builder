const { configResolver } = require('../ioHelpers').dethunked;
const sanitizeFolderName = require('../utils/sanitizeFolderName');
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

  if(!scg.title) throw("Requires StageContainerGroup Title for project resolution.");
  if(!sc.version) throw("Requires StageContainer Version for project resolution.");
  if(!stage.title) throw("Requires Stage Title for project resolution.");

  return path.join(PROJECTS_DIR,
    sanitizeFolderName(scg.title),
    sanitizeFolderName(sc.version),
    sanitizeFolderName(stage.title),
    filePath);
}

module.exports = findSolutionPath;
