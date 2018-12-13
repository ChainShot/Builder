const { MODEL_DB, LOOKUP_KEY } = require('../../../config');
const { ObjectID } = require('mongodb');
const solutionProjectProps = require('./projectProps');

module.exports = ({ configWriter, fileWriter }, { findSolutionPath }) => {
  async function createDocument(stageId, codeFileId) {
    return await configWriter(MODEL_DB.SOLUTIONS, {
      id: ObjectID().toString(),
      stageId,
      codeFileId,
      code: LOOKUP_KEY,
    });
  }

  async function createProjectFiles(solution) {
    const filePath = await findSolutionPath(solution);
    const keys = Object.keys(solutionProjectProps);
    for(let i = 0; i < keys.length; i++) {
      await fileWriter(filePath, "");
    }
  }

  async function createSolution(stageId, codeFileId) {
    const solution = await createDocument(stageId, codeFileId);
    await createProjectFiles(solution);
    return solution;
  }

  return createSolution;
}
