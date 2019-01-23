const {
  SOLUTION_PROJECT_PATH,
  CODE_FILE_PROJECT_PATH,
  CODE_FILE_PROJECT_PATHS,
  STAGE_PROJECT_PATH,
  STAGE_CONTAINER_PROJECT_PATH,
  STAGE_CONTAINER_GROUP_PROJECT_PATH,
  MODEL_DB,
} = require('./constants');
const {
  mockCollections
} = require('./testData');
const path = require('path');

const findSolutionPath = ({ stageId, codeFileId, codeFile }) => {
  codeFile = codeFile || mockCollections[MODEL_DB.CODE_FILES][codeFileId];
  return path.join(
    SOLUTION_PROJECT_PATH,
    codeFile.executablePath,
  );
}
const findCodeFilePath = () => CODE_FILE_PROJECT_PATH;
const findCodeFilePaths = () => CODE_FILE_PROJECT_PATHS;
const findStageFilePath = () => STAGE_PROJECT_PATH;
const findStageContainerFilePath = () => STAGE_CONTAINER_PROJECT_PATH;
const findStageContainerGroupFilePath = (group) => {
  return path.join(
    STAGE_CONTAINER_GROUP_PROJECT_PATH,
    group.title,
  );
};

module.exports = {
  findSolutionPath,
  findCodeFilePath,
  findCodeFilePaths,
  findStageFilePath,
  findStageContainerFilePath,
  findStageContainerGroupFilePath,
};
