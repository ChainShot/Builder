const { CONFIG_DIR, MODEL_DB } = require('../config');
const { fileResolver } = require('../utils/ioHelpers');
const path = require('path');

async function configUpdate(name) {
  const [modelDB, file] = name.replace(`${CONFIG_DIR}/`, '').split('/');
  const id = file.split('.')[0];
  if(modelDB === MODEL_DB.STAGE_CONTAINERS) {
    return { modelType: 'stageContainer', id }
  }
  if(modelDB === MODEL_DB.STAGES) {
    const contents = JSON.parse(await fileResolver(name));
    return { modelType: 'stageContainer', id: contents.containerId }
  }
  if(modelDB === MODEL_DB.CODE_FILES) {
    // TBD
  }
}

module.exports = configUpdate;