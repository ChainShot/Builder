const sanitizeFolderName = require('../utils/sanitizeFolderName');
const { PROJECTS_DIR } = require('../config');
const path = require('path');

const findStageContainerFilePath = (scg) => {
  if(!scg.title) throw("Requires StageContainerGroup Title for project resolution.");
  
  return path.join(PROJECTS_DIR, sanitizeFolderName(scg.title));
}

module.exports = findStageContainerFilePath;
