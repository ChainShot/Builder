const {blankLookups} = require('./testDataHelpers');
const {mockCollections} = require('./testData');

module.exports = (collection, props) => {
  mockCollections[collection][props.id] = props;
}
