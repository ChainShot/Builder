const { configResolver, sanitizeFolderName } = require('../utils/ioHelpers');
const { PROJECTS_DIR, MODEL_DB } = require('../config');
const path = require('path');

const getBasePath = async (stage) => {
  const sc = await configResolver(MODEL_DB.STAGE_CONTAINERS, stage.containerId);
  const scg = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, sc.stageContainerGroupId);

  return path.join(PROJECTS_DIR,
    sanitizeFolderName(scg.title),
    sanitizeFolderName(sc.version),
    sanitizeFolderName(stage.title));
}

const stageLookup = async (props, fileName) => {
  return path.join(await getBasePath(props), fileName);
}

module.exports = stageLookup;
