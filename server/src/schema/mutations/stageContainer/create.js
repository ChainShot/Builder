const { MODEL_DB } = require('../../../config');
const { ObjectID } = require('mongodb');
const stageContainerProjectProps = require('./projectProps');
const path = require('path');

module.exports = ({ configWriter, configResolver, fileWriter }, { findStageContainerFilePath }) => {
  async function createDocument({ containerType, id }) {
    return await configWriter(MODEL_DB.STAGE_CONTAINERS, {
      id: ObjectID().toString(),
      type: containerType,
      stageContainerGroupId: id,
      version: 'TBD',
    });
  }

  async function createProjectFiles(stageContainer) {
    const basePath = await findStageContainerFilePath(stageContainer);
    const keys = Object.keys(stageContainerProjectProps);
    for(let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const filename = stageContainerProjectProps[key];
        const contents = stageContainer[key] || "";
        await fileWriter(path.join(basePath, filename), contents);
    }
  }

  async function createStageContainer(stageContainerGroupId) {
    const stageContainerGroup = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, stageContainerGroupId);
    const stageContainer = await createDocument(stageContainerGroup);
    await createProjectFiles(stageContainer);
    return stageContainer;
  }

  return createStageContainer;
}
