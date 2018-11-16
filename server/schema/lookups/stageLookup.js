const { dbResolver, sanitizeFolderName } = require('../utils');
const { PROJECTS_DIR } = require('../../config');
const path = require('path');

const getBasePath = async (stage) => {
  const sc = await dbResolver('stage_containers', stage.containerId);
  const scg = await dbResolver('stage_container_groups', sc.stageContainerGroupId);

  return path.join(PROJECTS_DIR,
    sanitizeFolderName(scg.title),
    sanitizeFolderName(sc.version),
    sanitizeFolderName(stage.title));
}

const stageLookup = async (props, field) => {
  return path.join(await getBasePath(props), field);
}

module.exports = stageLookup;
