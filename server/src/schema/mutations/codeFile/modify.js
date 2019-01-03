const cfProjectProps = require('./projectProps');

module.exports = (injections) => {
  const createSolution = require('../solution/create')(injections);
  const {
    config: { LOOKUP_KEY, MODEL_DB },
    ioHelpers: { configWriter, configRemove, rename, fileWriter, configResolver, configDocumentReader },
    projectHelpers: { findCodeFilePaths, findSolutionPath },
  } = injections;

  const onChange = {
    executablePath: async (codeFile) => {
      if(codeFile.hasProgress) {
        const { codeStageIds } = codeFile;
        for(let i = 0; i < codeStageIds.length; i++) {
          const codeStageId = codeStageIds[i];
          const solutions = await configDocumentReader(MODEL_DB.SOLUTIONS);
          const solution = solutions.find(x => (x.codeFileId === codeFile.id) && (x.stageId === codeStageId));
          if(solution) {
            // the tricky part here is the solution path depends upon
            // the codefile executablePath being updated
            // without passing in the codefile before or after we'll never quite
            // catch the path changing and so it won't update quite right...
            // that's why we're passing it into the findSolutionPath
            const newPath = await findSolutionPath({ ...solution, codeFile });
            const previousPath = await findSolutionPath(solution);
            if(newPath !== previousPath) {
              await rename(previousPath, newPath);
            }
          }
        }
      }
    },
    hasProgress: async (codeFile) => {
      if(codeFile.hasProgress) {
        const { codeStageIds } = codeFile;
        for(let i = 0; i < codeStageIds.length; i++) {
          const codeStageId = codeStageIds[i];
          await createSolution(codeStageId, codeFile.id);
        }
      }
      else {
        const { codeStageIds } = codeFile;
        for(let i = 0; i < codeStageIds.length; i++) {
          const codeStageId = codeStageIds[i];
          const solutions = await configDocumentReader(MODEL_DB.SOLUTIONS);
          const solution = solutions.find(x => (x.codeFileId === codeFile.id) && (x.stageId === codeStageId));
          if(solution) {
            // no need to remove project files as well since the renaming will handle it
            await configRemove(MODEL_DB.SOLUTIONS, solution.id);
          }
        }
      }
    }
  }

  async function rewritePaths(previousPaths, newPaths) {
    for(let i = 0; i < previousPaths.length; i++) {
      const newPath = newPaths[i];
      const previousPath = previousPaths[i];
      if(previousPath !== newPath) {
          await rename(previousPath, newPath);
      }
    }
  }

  async function modifyCodeFile(props) {
    const codeFile = await configResolver(MODEL_DB.CODE_FILES, props.id);
    const merged = { ...codeFile, ...props };

    const newPaths = await findCodeFilePaths(merged);
    const previousPaths = await findCodeFilePaths(codeFile);
    await rewritePaths(previousPaths, newPaths);

    const keys = Object.keys(props);
    for(let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if(codeFile[key] !== merged[key]) {
        if(onChange[key]) {
          await onChange[key](merged);
        }
        if(cfProjectProps[key]) {
          await Promise.all(newPaths.map(async (path) => {
            return await fileWriter(path, merged[key]);
          }));
          merged[key] = LOOKUP_KEY;
        }
      }
    }

    return configWriter(MODEL_DB.CODE_FILES, merged);
  }

  return modifyCodeFile;
}
