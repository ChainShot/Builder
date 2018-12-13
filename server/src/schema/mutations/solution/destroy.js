const { MODEL_DB } = require('../../../config');

module.exports = ({ fileRemove, configRemove, configResolver }, { findSolutionPath }) => {
  async function removeProjectFiles(solution) {
    const path = await findSolutionPath(solution);
    await fileRemove(path);
  }

  async function destroySolution(id) {
    const solution = await configResolver(MODEL_DB.SOLUTIONS, id);
    await removeProjectFiles(solution);
    await configRemove(MODEL_DB.SOLUTIONS, id);
  }

  return destroySolution;
}
