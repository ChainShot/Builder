const DEFAULT_CONFIG = require('../../../src/config');
const path = require('path');
const MOCK_CONFIG = {
  TEMPLATES_DIR: path.join(__dirname, "..", "..", "templates"),
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
}
