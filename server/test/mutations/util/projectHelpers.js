const {
  SOLUTION_PROJECT_PATH,
  CODE_FILE_PROJECT_PATHS,
  STAGE_PROJECT_PATH,
  STAGE_CONTAINER_PROJECT_PATH,
  STAGE_CONTAINER_GROUP_PROJECT_PATH,
} = require('./constants');

const findSolutionPath = () => SOLUTION_PROJECT_PATH;
const findCodeFilePaths = () => CODE_FILE_PROJECT_PATHS;
const findStageFilePath = () => STAGE_PROJECT_PATH;
const findStageContainerFilePath = () => STAGE_CONTAINER_PROJECT_PATH;
const findStageContainerGroupFilePath = () => STAGE_CONTAINER_GROUP_PROJECT_PATH;

module.exports = {
  findSolutionPath,
  findCodeFilePaths,
  findStageFilePath,
  findStageContainerFilePath,
  findStageContainerGroupFilePath,
};
