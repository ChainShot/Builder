const { CONFIG_DIR, MODEL_DB } = require('../config');
const { fileResolver, configResolver } = require('../utils/ioHelpers');
const path = require('path');

async function configUpdate(name) {
  const [modelDB, file] = name.replace(`${CONFIG_DIR}/`, '').split('/');
  const id = file.split('.')[0];
  if(modelDB === MODEL_DB.STAGE_CONTAINERS) {
    return { modelType: 'stageContainer', id }
  }
  if(modelDB === MODEL_DB.STAGES) {
    const {containerId} = JSON.parse(await fileResolver(name));
    return { modelType: 'stageContainer', id: containerId }
  }
  if(modelDB === MODEL_DB.CODE_FILES) {
    const {stageContainerId} = JSON.parse(await fileResolver(name));
    return { modelType: 'stageContainer', id: stageContainerId }
  }
  if(modelDB = MODEL_DB.SOLUTIONS) {
    const {stageId} = JSON.parse(await fileResolver(name));
    const {stageContainerId} = configResolver(MODEL_DB.STAGES, stageId);
    return { modelType: 'stageContainer', id: stageContainerId }
  }
}

module.exports = configUpdate;
