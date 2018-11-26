const DB_DIR = '../content/db';
const PROJECTS_DIR = '../content/projects';
const PORT = 3001;
const LOOKUP_KEY = '$$LOOKUP';
const MODEL_DB = {
  CODE_FILES: 'codeFiles',
  STAGE_CONTAINER_GROUPS: 'stageContainerGroups',
  STAGE_CONTAINERS: 'stageContainers',
  STAGES: 'stages',
}

module.exports = {
  DB_DIR,
  PROJECTS_DIR,
  PORT,
  LOOKUP_KEY,
  MODEL_DB,
}
