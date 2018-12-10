const CONFIG_DIR = '../../Content/config';
const PROJECTS_DIR = '../../Content/projects';
const INITIAL_CODE_DIR = 'setup';
const PORT = 3001;
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
