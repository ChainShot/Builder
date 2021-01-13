const { ObjectID } = require('mongodb');
const createProjectFilesExport = require('./createProjectFiles');

module.exports = (injections) => {
  const {
    ioHelpers: { configWriter, configResolver },
    config: { MODEL_DB },
  } = injections;

  const createProjectFiles = createProjectFilesExport(injections);

  async function createDocument({ containerType, id }) {
    return await configWriter(MODEL_DB.STAGE_CONTAINERS, {
      id: ObjectID().toString(),
      type: containerType,
      stageContainerGroupId: id,
      version: 'TBD',
    });
  }

  async function createStageContainer(stageContainerGroupId) {
    const stageContainerGroup = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, stageContainerGroupId);
    const stageContainer = await createDocument(stageContainerGroup);
    await createProjectFiles(stageContainer);
    return stageContainer;
  }

  return createStageContainer;
}
