const { blankLookups, blankArrays } = require('./testDataHelpers');

// helpers to lookup io activity
let mockCollections = blankLookups();
let writtenModelsLookup = blankLookups();
let writtenModels = blankArrays();
const writtenFiles = {};
let removedModels = blankLookups();
const removedFiles = {};
const removedDirectories = {};
const renamed = [];
const copied = [];

module.exports = {
  mockCollections,
  writtenModelsLookup,
  writtenModels,
  removedDirectories,
  writtenFiles,
  removedModels,
  removedFiles,
  renamed,
  copied,
}
