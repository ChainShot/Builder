const { MODEL_DB } = require('../../../config');
const { findStageContainerFilePath } = require('../../../projectHelpers');
const stageContainerProjectProps = require('./projectProps');
const destroyStage = require('../stage/destroy');
const path = require('path');
const {
  configRemove,
  configReader,
  configResolver,
  fileRemove,
} = require('../../../utils/ioHelpers');

async function destroyStages(stageContainer) {
  const ids = await configReader(MODEL_DB.STAGES);
  const stages = (await Promise.all(ids.map(id => configResolver(MODEL_DB.STAGES, id)))).filter(x => x.containerId === stageContainer.id);
  for(let i = 0; i < stages.length; i++) {
    await destroyStage(stages[i].id);
  }
}

async function destroyProjectFiles(stageContainer) {
  const stageContainerPath = await findStageContainerFilePath(stageContainer);
  const keys = Object.keys(stageContainerProjectProps);
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const file = stageContainerProjectProps[key];
    await fileRemove(path.join(stageContainerPath, file));
  }
}

async function destroyStageContainer(id) {
  const stageContainer = await configResolver(MODEL_DB.STAGE_CONTAINERS, id);
  await destroyStages(stageContainer);
  await destroyProjectFiles(stageContainer);
  await configRemove(MODEL_DB.STAGE_CONTAINERS, id);
}

module.exports = destroyStageContainer;
