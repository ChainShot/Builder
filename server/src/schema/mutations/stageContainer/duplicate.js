const { ObjectID } = require('mongodb');
const duplicateStageExport = require('../stage/duplicate');
const createProjectFilesExport = require('./createProjectFiles');

module.exports = (injections) => {
  const {
    ioHelpers: { configWriter, configResolver, copy, configDocumentReader },
    projectHelpers: { findStageFilePath },
    config: { LOOKUP_KEY, MODEL_DB },
  } = injections;

  const duplicateStage = duplicateStageExport(injections);
  const createProjectFiles = createProjectFilesExport(injections);

  async function duplicateStageContainer(props) {
    const stageContainer = await configResolver(MODEL_DB.STAGE_CONTAINERS, props.id);
    const newStageContainer = {
      ...stageContainer,
      id: ObjectID().toString(),
      version: props.version,
      stageContainerGroupId: props.stageContainerGroupId,
      type: props.type,
      intro: props.intro,
    }

    // create the stage container
    await configWriter(MODEL_DB.STAGE_CONTAINERS, newStageContainer);
    await createProjectFiles(newStageContainer);

    // duplicate all the stages
    const stages = await configDocumentReader(MODEL_DB.STAGES);
    const relevantStages = stages.filter(x => x.containerId === props.id);
    for(let i = 0; i < relevantStages.length; i++) {
      const stage = {
        ...relevantStages[i],
        createNew: true
      }
      await duplicateStage(stage, {
        newStageContainerId: newStageContainer.id,
        shiftPositions: false
      });
    }

    return newStageContainer;
  }

  return duplicateStageContainer;
}
