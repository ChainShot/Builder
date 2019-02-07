const { ObjectID } = require('mongodb');

module.exports = (injections) => {
  const {
    config: { MODEL_DB },
    ioHelpers: { configWriter, configResolver },
  } = injections;

  async function createBadge(props) {
    const id = ObjectID().toString();
    if(props.stageContainerGroupId) {
      const stageContainerGroup = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, props.stageContainerGroupId);
      stageContainerGroup.badgeTypeIds = (stageContainerGroup.badgeTypeIds || []).concat(id);
      await configWriter(MODEL_DB.STAGE_CONTAINER_GROUPS, stageContainerGroup);
    }
    return await configWriter(MODEL_DB.BADGE_TYPES, {
      id, ...props,
    });
  }

  return createBadge;
}
