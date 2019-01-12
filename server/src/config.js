require('dotenv').config();
const path = require('path');

const CONTENT_REPO_NAME = process.env.CONTENT_REPO_NAME || 'Content';
// will place the content folder on the same level as builder
const BUILDER_LEVEL = path.join(__dirname, '..', '..', '..');
const CONTENT_PATH = process.env.CONTENT_PATH || BUILDER_LEVEL;
const CONTENT_DIR = path.join(CONTENT_PATH, CONTENT_REPO_NAME);
const CONFIG_DIR = `${CONTENT_DIR}/config`;
const PROJECTS_DIR = `${CONTENT_DIR}/projects`;
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');
const INITIAL_CODE_DIR = 'setup';
const PORT = process.env.PORT || 59449;
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
  CONTENT_DIR,
  PROJECTS_DIR,
  TEMPLATES_DIR,
  PORT,
  LOOKUP_KEY,
  INITIAL_CODE_DIR,
  MODEL_DB,
}
