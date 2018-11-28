const camelize = require('../utils/camelize');
const { DB_DIR } = require('../config');

const dbUpdate = (evt, name) => {
  // TODO: normalize slashes to make this windows safe
  const [pluralModel, file] = name.replace(`${DB_DIR}/`, '').split("/");
  const modelType = camelize(pluralModel).slice(0, -1);
  const id = file.split(".")[0];
  return { modelType, id };
}

module.exports = dbUpdate;
