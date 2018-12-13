const { sanitizeFolderName } = require('../ioHelpers').dethunked;
const { PROJECTS_DIR } = require('../config');
const path = require('path');

const findStageContainerFilePath = (scg) => {
  return path.join(PROJECTS_DIR, sanitizeFolderName(scg.title));
}

module.exports = findStageContainerFilePath;
