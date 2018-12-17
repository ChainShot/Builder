require('dotenv').config();
const path = require('path');

const CONTENT_REPO_NAME = process.env.CONTENT_REPO_NAME || 'Content';
// assumes the content repo to be on the same level as Builder
const CONTENT_DIR = path.join(__dirname, '..', '..', '..', CONTENT_REPO_NAME);
const CONFIG_DIR = `${CONTENT_DIR}/config`;
const PROJECTS_DIR = `${CONTENT_DIR}/projects`;
const INITIAL_CODE_DIR = 'setup';
const PORT = process.env.PORT || 3001;
const LOOKUP_KEY = '$$LOOKUP';
const MODEL_DB = {
  CODE_FILES: 'codeFiles',
  STAGE_CONTAINER_GROUPS: 'stageContainerGroups',
  STAGE_CONTAINERS: 'stageContainers',
  STAGES: 'stages',
  SOLUTIONS: 'solutions',
}

module.exports = {
  CONFIG_DIR,
  PROJECTS_DIR,
  PORT,
  LOOKUP_KEY,
  INITIAL_CODE_DIR,
  MODEL_DB,
}
