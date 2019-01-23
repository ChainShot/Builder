module.exports = ({
  ioHelpers: { fileRemove, configRemove, configResolver },
  projectHelpers: { findSolutionPath },
  config: { MODEL_DB },
}) => {
  async function removeProjectFiles(solution) {
    const path = await findSolutionPath(solution);
    await fileRemove(path);
  }

  async function destroySolution(id) {
    const solution = await configResolver(MODEL_DB.SOLUTIONS, id);
    await removeProjectFiles(solution);
    await configRemove(MODEL_DB.SOLUTIONS, id);
    return id;
  }

  return destroySolution;
}
