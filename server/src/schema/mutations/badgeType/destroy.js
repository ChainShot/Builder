const path = require('path');

module.exports = (injections) => {
  const {
    config: { MODEL_DB },
    ioHelpers: { configRemove, configWriter, configDocumentReader },
  } = injections;

  async function destroyBadge(id) {
    const stageContainerGroups = await configDocumentReader(MODEL_DB.STAGE_CONTAINER_GROUPS);
    for(let i = 0; i < stageContainerGroups.length; i++) {
      let stageContainerGroup = stageContainerGroups[i];
      const idx = (stageContainerGroup.badgeTypeIds || []).indexOf(id);
      if(idx >= 0) {
        stageContainerGroup.badgeTypeIds.splice(idx, 1);
        await configWriter(MODEL_DB.STAGE_CONTAINER_GROUPS, stageContainerGroup);
      }
    }
    await configRemove(MODEL_DB.BADGE_TYPES, id);
    return id;
  }

  return destroyBadge;
}
