const { configResolver } = require('../ioHelpers').dethunked;
const sanitizeFolderName = require('../utils/sanitizeFolderName');;
const assertProjectValue = require('./assertProjectValue');
const { PROJECTS_DIR, MODEL_DB } = require('../config');
const path = require('path');

const findStageContainerFilePath = async (sc) => {
  const scg = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, sc.stageContainerGroupId);

  return path.join(PROJECTS_DIR,
    assertProjectValue(sanitizeFolderName(scg.title)),
    assertProjectValue(sanitizeFolderName(sc.version)));
}

module.exports = findStageContainerFilePath;
