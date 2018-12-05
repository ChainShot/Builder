const path = require('path');
const { PROJECTS_DIR } = require('../../../config');
const Route = require('route-parser');

const cfRoute = new Route('/:groupTitle/:containerVersion/:stageTitle/*executablePath');

function getCodeFilePathParts(filePath) {
  return cfRoute.match(filePath.replace(PROJECTS_DIR, ''));
}

module.exports = getCodeFilePathParts;
