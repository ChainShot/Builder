const { MODEL_DB, LOOKUP_KEY } = require('../../../config');
const { ObjectID } = require('mongodb');
const { findSolutionPath } = require('../../../projectHelpers');
const solutionProjectProps = require('./projectProps');
const path = require('path');
const {
  configWriter,
  fileWriter,
} = require('../../../utils/ioHelpers');

async function createDocument(stageId, codeFileId) {
  return await configWriter(MODEL_DB.SOLUTIONS, {
    id: ObjectID().toString(),
    stageId,
    codeFileId,
    code: LOOKUP_KEY,
  });
}

async function createProjectFiles(solution) {
  const basePath = await findSolutionPath(solution);
  const keys = Object.keys(solutionProjectProps);
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const filename = solutionProjectProps[key];
    const contents = solution[key] || "";
    await fileWriter(path.join(basePath, filename), contents);
  }
}

async function createSolution(stageId, codeFileId) {
  const solution = await createDocument(stageId, codeFileId);
  await createProjectFiles(solution);
  return solution;
}

module.exports = createSolution;
