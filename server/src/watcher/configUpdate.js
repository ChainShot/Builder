const { CONFIG_DIR, MODEL_DB } = require('../config');
const { fileResolver, configResolver } = require('../ioHelpers').dethunked;
const fs = require('fs-extra');

async function configUpdate(filePath) {
  const [modelDB, file] = filePath.replace(`${CONFIG_DIR}/`, '').split('/');
  const id = file.split('.')[0];

  if(modelDB === MODEL_DB.STAGE_CONTAINERS) {
    // for now no socket updates to deleted stage containers
    const exists = await fs.exists(filePath);
    if(!exists) return null;
    return { modelType: 'stageContainer', id }
  }
  if(modelDB === MODEL_DB.STAGES) {
    const {containerId} = JSON.parse(await fileResolver(filePath));
    return { modelType: 'stageContainer', id: containerId }
  }
  if(modelDB === MODEL_DB.CODE_FILES) {
    const {stageContainerId} = JSON.parse(await fileResolver(filePath));
    return { modelType: 'stageContainer', id: stageContainerId }
  }
  if(modelDB === MODEL_DB.SOLUTIONS) {
    const {stageId} = JSON.parse(await fileResolver(filePath));
    const {stageContainerId} = configResolver(MODEL_DB.STAGES, stageId);
    return { modelType: 'stageContainer', id: stageContainerId }
  }
}

module.exports = configUpdate;
