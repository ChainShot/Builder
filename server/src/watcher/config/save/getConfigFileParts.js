const path = require('path');
const { CONFIG_DIR } = require('../../../config');
const Route = require('route-parser');

const configRoute = new Route('/:model/:id.json');

function getConfigFileParts(filePath) {
  return configRoute.match(filePath.replace(CONFIG_DIR, ''));
}

module.exports = getConfigFileParts;
