const camelize = require('../utils/camelize');
const { DB_DIR } = require('../config');

const dbUpdate = (evt, name) => {
  // TODO: normalize slashes to make this windows safe
  const [model, file] = name.replace(`${DB_DIR}/`, '').split("/");
  return {
    model: camelize(model),
    id: file.split(".")[0],
  }
}

module.exports = dbUpdate;
