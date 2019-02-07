module.exports = ({
  ioHelpers: { configWriter, configResolver },
  config: { MODEL_DB },
}) => {
  async function modifyBadge(props) {
    const badgeType = await configResolver(MODEL_DB.BADGE_TYPES, props.id);
    const merged = { ...badgeType, ...props };
    return configWriter(MODEL_DB.BADGE_TYPES, merged);
  }

  return modifyBadge;
}
