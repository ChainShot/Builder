const { dbResolver, sanitizeFolderName } = require('../utils');
const { PROJECTS_DIR } = require('../../config');
const path = require('path');

const getBasePath = async (sc) => {
  const scg = await dbResolver('stage_container_groups', sc.stageContainerGroupId);

  return path.join(PROJECTS_DIR,
    sanitizeFolderName(scg.title),
    sanitizeFolderName(sc.version));
}

const stageContainerLookup = async (props, field) => {
  return path.join(await getBasePath(props), field);
}

module.exports = stageContainerLookup;
