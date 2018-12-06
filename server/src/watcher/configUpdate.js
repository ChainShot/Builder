const camelize = require('../utils/camelize');
const { CONFIG_DIR } = require('../config');
const path = require('path');

const configUpdate = (name) => {
  const [pluralModel, file] = name.replace(`${CONFIG_DIR}/`, '').split('/');
  const modelType = camelize(pluralModel).slice(0, -1);
  const id = file.split(".")[0];
  return { modelType, id };
}

module.exports = configUpdate;
