const configDocumentReader = require('./configDocumentReader');
const configReader = require('./configReader');
const configRemove = require('./configRemove');
const configResolver = require('./configResolver');
const configWriter = require('./configWriter');
const fileRemove = require('./fileRemove');
const fileResolver = require('./fileResolver');
const fileWriter = require('./fileWriter');
const rename = require('./rename');

const helpers = {
  configDocumentReader,
  configReader,
  configRemove,
  configResolver,
  configWriter,
  fileRemove,
  fileResolver,
  fileWriter,
  rename,
}

// a set of a helpers which can be invoked immediately without a transaction
const dethunked = Object.keys(helpers).reduce((acc, key) => {
  acc[key] = helpers[key]();
  return acc;
}, {});

// function to create a set of helpers that will make use of a particular transaction
const withTransaction = (transaction) => {
  return Object.keys(helpers).reduce((acc, key) => {
    acc[key] = helpers[key](transaction);
    return acc;
  }, {});
}

module.exports = {
  dethunked,
  withTransaction,
}
