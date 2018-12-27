const { ObjectID } = require('mongodb');

module.exports = (injections) => {
  const createStageContainer = require('../stageContainer/create')(injections);
  const {
    config: { MODEL_DB },
    ioHelpers: { configWriter },
  } = injections;

  async function createDocument(props) {
    return await configWriter(MODEL_DB.STAGE_CONTAINER_GROUPS, {
      title: 'Untitled',
      ...props,
    });
  }

  async function createStageContainerGroup(props) {
    const stageContainerGroupId = ObjectID().toString();
    const stageContainerGroup = await createDocument({ id: stageContainerGroupId, ...props });
    const stageContainer = await createStageContainer(stageContainerGroupId);
    return {
      ...stageContainerGroup,
      stageContainers: [stageContainer]
    }
  }

  return createStageContainerGroup;
}
