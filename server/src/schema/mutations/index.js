const codeFileFields = require('./codeFileFields');
const stageContainerFields = require('./stageContainerFields');
const stageFields = require('./stageFields');
const solutionFields = require('./solutionFields');
const stageContainerGroupFields = require('./stageContainerGroupFields');
const badgeTypeFields = require('./badgeTypeFields');

module.exports = {
  ...solutionFields,
  ...codeFileFields,
  ...stageContainerFields,
  ...stageFields,
  ...stageContainerGroupFields,
  ...badgeTypeFields,
}
