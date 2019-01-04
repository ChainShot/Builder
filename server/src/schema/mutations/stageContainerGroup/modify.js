module.exports = ({
  ioHelpers: { configWriter, configResolver, rename },
  projectHelpers: { findStageContainerGroupFilePath },
  config: { MODEL_DB },
}) => {
  async function modifyStageContainerGroup(props) {
    const stageContainerGroup = await configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, props.id);
    const merged = { ...stageContainerGroup, ...props };

    const newBasePath = await findStageContainerGroupFilePath(merged);
    const previousBasePath = await findStageContainerGroupFilePath(stageContainerGroup);

    if(newBasePath !== previousBasePath) {
      await rename(previousBasePath, newBasePath);
    }
    return configWriter(MODEL_DB.STAGE_CONTAINER_GROUPS, merged);
  }

  return modifyStageContainerGroup;
}
