const { PROJECTS_DIR } = require('../config');
const modelLookup = require('./modelLookup');

const projectUpdate = (evt, name) => {
  const fileName = name.replace(`${PROJECTS_DIR}/`, '');
  return modelLookup(fileName);
}

module.exports = projectUpdate;
