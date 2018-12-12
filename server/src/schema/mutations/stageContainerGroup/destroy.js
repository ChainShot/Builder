const { MODEL_DB } = require('../../../config');
const destroyStageContainer = require('../stageContainer/destroy');
const {
  configRemove,
  configReader,
  configResolver,
} = require('../../../utils/ioHelpers');

async function destroyStageContainers(stageContainerGroup) {
  const ids = await configReader(MODEL_DB.STAGE_CONTAINERS);
  const stageContainers = (await Promise.all(ids.map(id => configResolver(MODEL_DB.STAGE_CONTAINERS, id))))
    .filter(x => x.stageContainerGroupId === stageContainerGroup.id);
  for(let i = 0; i < stageContainers.length; i++) {
    await destroyStageContainer(stageContainers[i].id);
  }
}

async function destroyStageContainerGroup(id) {
  const stageContainerGroup = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, id);
  await destroyStageContainers(stageContainerGroup);
  await configRemove(MODEL_DB.STAGE_CONTAINER_GROUPS, id);
}

module.exports = destroyStageContainerGroup;
