const solutionProjectProps = require('./projectProps');

module.exports = ({
  ioHelpers: { configWriter, fileWriter, configResolver, rename },
  projectHelpers: { findSolutionPath },
  config: { LOOKUP_KEY, MODEL_DB },
}) => {
  async function modifySolution(props) {
    const solution = await configResolver(MODEL_DB.SOLUTIONS, props.id);
    const merged = { ...solution, ...props };

    const newPath = await findSolutionPath(merged);
    const previousPath = await findSolutionPath(solution);

    if(newPath !== previousPath) {
      await rename(previousPath, newPath);
    }

    const keys = Object.keys(props);
    for(let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if(solutionProjectProps[key]) {
        await fileWriter(newPath, merged[key]);
        merged[key] = LOOKUP_KEY;
      }
    }

    return configWriter(MODEL_DB.SOLUTIONS, merged);
  }

  return modifySolution;
}
