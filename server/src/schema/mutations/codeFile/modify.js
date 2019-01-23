const cfProjectProps = require('./projectProps');

module.exports = (injections) => {
  const destroySolution = require('../solution/destroy')(injections);
  const createSolution = require('../solution/create')(injections);
  const validate = require('./validate')(injections);
  const {
    config: { LOOKUP_KEY, MODEL_DB },
    ioHelpers: { configWriter, configRemove, copy, fileRemove, rename, exists, fileWriter, fileResolver, configResolver, configDocumentReader },
    projectHelpers: { findCodeFilePath, findCodeFilePaths, findSolutionPath },
  } = injections;

  const onChange = {
    // codeStageIds is modified when adding an existing code file to a new stage
    codeStageIds: async (previousCodeFile, currentCodeFile) => {
      const prevIds = previousCodeFile.codeStageIds;
      const curIds = currentCodeFile.codeStageIds;
      if(prevIds.length > curIds.length) {
        // we've dropped a code stage, let's make sure to cleanup project files
        const removedStageId = prevIds.find(x => curIds.indexOf(x) === -1);
        const filePath = await findCodeFilePath(removedStageId, currentCodeFile);

        await fileRemove(filePath);

        if(currentCodeFile.hasProgress) {
          const solutions = await configDocumentReader(MODEL_DB.SOLUTIONS);
          const solution = solutions.find(x => x.stageId === removedStageId && x.codeFileId === currentCodeFile.id);
          await destroySolution(solution.id);
        }
      }
      else {
        // we've added a code stage, let's make sure to add project files
        // and a solution if necessary
        const addedStageId = curIds.find(x => prevIds.indexOf(x) === -1);
        const otherStageId = curIds.find(x => prevIds.indexOf(x) === 1);
        const filePath = await findCodeFilePath(addedStageId, currentCodeFile);
        const otherFilePath = await findCodeFilePath(otherStageId, currentCodeFile);

        // copy the contents of a pre-existing code file into this one
        await copy(otherFilePath, filePath);

        if(currentCodeFile.hasProgress) {
          // create a solution if the code file has progress
          await createSolution(addedStageId, currentCodeFile.id);
        }
      }
    },
    executablePath: async (_, codeFile) => {
      if(codeFile.hasProgress) {
        // ensure that solutions are moved to the new path
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
    hasProgress: async (_, codeFile) => {
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
          const solution = await findSolution(codeFile.id, codeStageId);
          if(solution) {
              // no need to remove project files as well since the renaming will handle it
              await configRemove(MODEL_DB.SOLUTIONS, solution.id);
          }
        }
      }
    }
  }

  async function findSolution(codeFileId, codeStageId) {
    const solutions = await configDocumentReader(MODEL_DB.SOLUTIONS);
    return solutions.find(x => (x.codeFileId === codeFileId) && (x.stageId === codeStageId));
  }

  async function rewritePaths(previousPaths, newPaths) {
    if(previousPaths.length === newPaths.length) {
      // only overwrite if the paths length are equal
      // we can freely move x => y1, y => x1, etc...
      // until all new paths are filled and old paths removed
      for(let i = 0; i < previousPaths.length; i++) {
        const newPath = newPaths[i];
        const previousPath = previousPaths[i];
        if(previousPath !== newPath) {
          await rename(previousPath, newPath);
        }
      }
    }
  }

  async function modifyCodeFile(props) {
    const codeFile = await configResolver(MODEL_DB.CODE_FILES, props.id);
    const merged = { ...codeFile, ...props };

    // validate after we have all the info (existing & new)
    await validate(merged);

    const newPaths = await findCodeFilePaths(merged);
    const previousPaths = await findCodeFilePaths(codeFile);
    await rewritePaths(previousPaths, newPaths);

    const keys = Object.keys(props);
    for(let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if(codeFile[key] !== merged[key]) {
        if(onChange[key]) {
          await onChange[key](codeFile, merged);
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
