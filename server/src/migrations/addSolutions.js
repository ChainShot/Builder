const path = require('path');
const { MODEL_DB, PROJECTS_DIR, INITIAL_CODE_DIR } = require('../config');
const { configReader, fileWriter, fileResolver, configResolver, sanitizeFolderName } = require('../utils/ioHelpers');

const findOldPaths = ({ executablePath, codeStageIds, name }) => {
  const ids = (codeStageIds || []);
  return Promise.all(ids.map(async (id) => {
    const stage = await configResolver(MODEL_DB.STAGES, id);
    const sc = await configResolver(MODEL_DB.STAGE_CONTAINERS, stage.containerId);
    const scg = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, sc.stageContainerGroupId);

    return path.join(PROJECTS_DIR,
      sanitizeFolderName(scg.title),
      sanitizeFolderName(sc.version),
      sanitizeFolderName(stage.title),
      executablePath || "");
  }));
}

const findNewPaths = ({ codeStageIds, name }) => {
  const ids = (codeStageIds || []);
  return Promise.all(ids.map(async (id) => {
    const stage = await configResolver(MODEL_DB.STAGES, id);
    const sc = await configResolver(MODEL_DB.STAGE_CONTAINERS, stage.containerId);
    const scg = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, sc.stageContainerGroupId);

    return path.join(PROJECTS_DIR,
      sanitizeFolderName(scg.title),
      sanitizeFolderName(sc.version),
      sanitizeFolderName(stage.title),
      INITIAL_CODE_DIR,
      name || "untitled");
  }));
}

async function addSolution(codeFile) {
  if(codeFile.hasProgress) {
    const oldPaths = await findOldPaths(codeFile);
    const oldContents = await Promise.all(oldPaths.map(fileResolver));

    const newPaths = await findNewPaths(codeFile);
    for(let i = 0; i < newPaths.length; i++) {
      await fileWriter(newPaths[i], oldContents[i]);
    }
  }
}

async function runMigration() {
  const codeFileIds = await configReader(MODEL_DB.CODE_FILES);

  for(let i = 0; i < codeFileIds.length; i++) {
    const codeFile = await configResolver(MODEL_DB.CODE_FILES, codeFileIds[i]);
    await addSolution(codeFile);
  }
}

runMigration();
