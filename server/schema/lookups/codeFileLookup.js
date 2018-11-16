const { dbResolver, sanitizeFolderName } = require('../utils');
const { PROJECTS_DIR } = require('../../config');
const path = require('path');

const codeFileLookup = ({ executablePath, codeStageIds, name }) => {
  const ids = (codeStageIds || []);
  return Promise.all(ids.map(async (id) => {
    const stage = await dbResolver('stages', id);
    const sc = await dbResolver('stage_containers', stage.containerId);
    const scg = await dbResolver('stage_container_groups', sc.stageContainerGroupId);

    return path.join(PROJECTS_DIR,
      sanitizeFolderName(scg.title),
      sanitizeFolderName(sc.version),
      sanitizeFolderName(stage.title),
      executablePath);
  }));
}

module.exports = codeFileLookup;
