const sanitizeFolderName = require('../utils/sanitizeFolderName');
const { PROJECTS_DIR } = require('../config');
const assertProjectValue = require('./assertProjectValue');
const path = require('path');

const findStageContainerFilePath = (scg) => {
  return path.join(PROJECTS_DIR, assertProjectValue(sanitizeFolderName(scg.title)));
}

module.exports = findStageContainerFilePath;
