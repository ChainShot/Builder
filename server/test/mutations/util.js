const DEFAULT_CONFIG = require('../../src/config');
const path = require('path');
const MOCK_CONFIG = {
  TEMPLATES_DIR: path.join(__dirname, "..", "..", "src", "templates"),
  ...DEFAULT_CONFIG,
}
const MONGO_ID_REGEX = /^[0-9a-fA-F]{24}$/;
const LOOKUP_KEY = '$$LOOKUP';
const SOLUTION_PROJECT_PATH = 'test/solution';
const STAGE_PROJECT_PATH = 'test/stage';
const STAGE_CONTAINER_PROJECT_PATH = 'test/stageContainer';
const STAGE_CONTAINER_GROUP_PROJECT_PATH = 'test/stageContainerGroup';
const CODE_FILE_PROJECT_PATHS = [
  'test/codeFile/1',
  'test/codeFile/2',
  'test/codeFile/3',
];
const MODEL_DB = {
  CODE_FILES: 'codeFiles',
  STAGE_CONTAINER_GROUPS: 'stageContainerGroups',
  STAGE_CONTAINERS: 'stageContainers',
  STAGES: 'stages',
  SOLUTIONS: 'solutions',
}

// creates a bunch of blank lookup tables for the collections
const blankLookups = () => {
  return Object.keys(MODEL_DB).reduce((lookup, key) => {
    return {
      [MODEL_DB[key]]: {},
      ...lookup,
    }
  }, {});
}

// creates a bunch of blank arrays for the collections
const blankArrays = () => {
  return Object.keys(MODEL_DB).reduce((lookup, key) => {
    return {
      [MODEL_DB[key]]: [],
      ...lookup,
    }
  }, {});
}

// helpers to lookup io activity
let writtenModelsLookup = blankLookups();
let writtenModels = blankArrays();
const writtenFiles = {};
let removedModels = blankLookups();
const removedFiles = {};
const renamed = [];
const copied = [];

let mockCollections = blankLookups();

const mockConfigDocument = (collection, props) => {
  mockCollections[collection][props.id] = props;
}

// retains object references while clearing out the collections
const resetLookups = (lookups) => {
  Object.keys(lookups).forEach(lookup => resetLookup(lookups[lookup]))
}
const resetLookup = (lookup) => {
  Object.keys(lookup).forEach((doc) => delete lookup[doc])
}
const resetArrays = (collections) => {
  Object.keys(collections).forEach(collection => resetArray(collections[collection]))
}
const resetArray = (arr) => arr.length = 0

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

const configDocumentReader = (collection) => {
  return Object.keys(mockCollections[collection]).map(x => mockCollections[collection][x]);
}

const fileRemove = (filePath) => {
  removedFiles[filePath] = true;
}

const configRemove = (collection, id) => {
  delete mockCollections[collection][id];
  removedModels[collection][id] = true;
}

const configResolver = (collection, id) => {
  return mockCollections[collection][id];
}

const configWriter = (collection, props) => {
  writtenModelsLookup[collection] = { [props.id]: props };
  writtenModels[collection].push(props);
  mockCollections[collection][props.id] = props;
  return props;
}

const fileWriter = (filePath, props) => {
  writtenFiles[filePath] = props;
  return props;
}

const rename = (previousPath, newPath) => {
  renamed.push({
    previousPath,
    newPath
  });
}

const copy = (previousPath, newPath) => {
  copied.push({
    previousPath,
    newPath
  });
}

const findSolutionPath = () => SOLUTION_PROJECT_PATH;
const findCodeFilePaths = () => CODE_FILE_PROJECT_PATHS;
const findStageFilePath = () => STAGE_PROJECT_PATH;
const findStageContainerFilePath = () => STAGE_CONTAINER_PROJECT_PATH;
const findStageContainerGroupFilePath = () => STAGE_CONTAINER_GROUP_PROJECT_PATH;

const projectHelpers = {
  findSolutionPath,
  findCodeFilePaths,
  findStageFilePath,
  findStageContainerFilePath,
  findStageContainerGroupFilePath,
}

const ioHelpers = {
  configWriter,
  fileWriter,
  fileRemove,
  configRemove,
  configDocumentReader,
  configResolver,
  copy,
}

const mutationWrapper = (fn) => {
  return fn({
    config: MOCK_CONFIG,
    ioHelpers,
    projectHelpers,
  });
}

module.exports = {
  LOOKUP_KEY,
  SOLUTION_PROJECT_PATH,
  CODE_FILE_PROJECT_PATHS,
  STAGE_CONTAINER_PROJECT_PATH,
  STAGE_CONTAINER_GROUP_PROJECT_PATH,
  STAGE_PROJECT_PATH,
  MONGO_ID_REGEX,
  MODEL_DB,
  MOCK_CONFIG,
  writtenModelsLookup,
  writtenModels,
  writtenFiles,
  removedModels,
  removedFiles,
  renamed,
  copied,
  mockSuite,
  mockConfigDocument,
  mutationWrapper,
  ioHelpers,
  projectHelpers,
}
