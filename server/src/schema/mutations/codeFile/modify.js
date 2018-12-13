const cfProjectProps = require('./projectProps');
const { LOOKUP_KEY, MODEL_DB } = require('../../../config');

module.exports = (ioHelpers, projectHelpers) => {
  const createSolution = require('../solution/create')(ioHelpers, projectHelpers);
  const destroySolution = require('../solution/destroy')(ioHelpers, projectHelpers);
  const { configWriter, rename, fileWriter, configResolver, configDocumentReader } = ioHelpers;
  const { findCodeFilePaths } = projectHelpers;

  const onChange = {
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
              await destroySolution(solution.id);
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

    return configWriter(MODEL_DB.CODE_FILES, merged);
  }

  return modifyCodeFile;
}
