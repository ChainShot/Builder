const stageContainerProjectProps = require('./projectProps');
const path = require('path');

module.exports = (injections) => {
  const destroyStage = require('../stage/destroy')(injections);
  const {
    config: { MODEL_DB },
    ioHelpers: { configDocumentReader, configRemove, configResolver, fileRemove },
    projectHelpers: { findStageContainerFilePath },
  } = injections;

  async function destroyStages(stageContainer) {
    const stages = (await configDocumentReader(MODEL_DB.STAGES)).filter(x => x.containerId === stageContainer.id);
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
    return id;
  }

  return destroyStageContainer;
}
