const { PROJECTS_DIR } = require('../config');
const stageContainerLookup = require('./stageContainerLookup');

const projectUpdate = (evt, name) => {
  const fileName = name.replace(`${PROJECTS_DIR}/`, '');
  return stageContainerLookup(fileName);
}

module.exports = projectUpdate;
