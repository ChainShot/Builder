const { dbResolver, sanitizeFolderName } = require('../utils/ioHelpers');
const { PROJECTS_DIR, MODEL_DB } = require('../config');
const path = require('path');

const codeFileLookup = ({ executablePath, codeStageIds, name }) => {
  const ids = (codeStageIds || []);
  return Promise.all(ids.map(async (id) => {
    const stage = await dbResolver(MODEL_DB.STAGES, id);
    const sc = await dbResolver(MODEL_DB.STAGE_CONTAINERS, stage.containerId);
    const scg = await dbResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, sc.stageContainerGroupId);

    return path.join(PROJECTS_DIR,
      sanitizeFolderName(scg.title),
      sanitizeFolderName(sc.version),
      sanitizeFolderName(stage.title),
      executablePath);
  }));
}

module.exports = codeFileLookup;
