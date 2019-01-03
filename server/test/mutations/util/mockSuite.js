const {
  mockCollections,
  writtenModelsLookup,
  writtenModels,
  writtenFiles,
  removedModels,
  removedFiles,
  renamed,
  copied,
} = require('./testData');

// retains object references while clearing out the collections
const resetLookup = (lookup) => {
  Object.keys(lookup).forEach((doc) => delete lookup[doc])
}
const resetArray = (arr) => arr.length = 0;
const resetLookups = (lookups) => {
  Object.keys(lookups).forEach(lookup => resetLookup(lookups[lookup]))
}
const resetArrays = (collections) => {
  Object.keys(collections).forEach(collection => resetArray(collections[collection]))
}

function mockSuite(desc, cb) {
  describe(desc, () => {
    before(() => {
      resetLookups(writtenModelsLookup);
      resetLookups(removedModels);
      resetLookups(mockCollections);
      resetLookup(writtenFiles);
      resetLookup(removedFiles);
      resetArrays(writtenModels);
      resetArray(renamed);
    });

    cb();
  });
}

module.exports = mockSuite;
