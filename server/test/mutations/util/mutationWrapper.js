const {MOCK_CONFIG} = require('./constants');
const ioHelpers = require('./ioHelpers');
const projectHelpers = require('./projectHelpers');

module.exports = (fn) => {
  return fn({
    config: MOCK_CONFIG,
    ioHelpers,
    projectHelpers,
  });
}
