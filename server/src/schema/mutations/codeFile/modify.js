const { findCodeFilePaths } = require('../../../projectHelpers');
const {
  configWriter,
  fileWriter,
  configResolver,
  configDocumentReader,
} = require('../../../utils/ioHelpers');
const cfProjectProps = require('./projectProps');
const createSolution = require('../solution/create');
const destroySolution = require('../solution/destroy');
const { LOOKUP_KEY, MODEL_DB } = require('../../../config');
const fs = require('fs-extra');

const onChange = {
  hasProgress: async (codeFile) => {
    if(codeFile.hasProgress) {
      const { codeStageIds } = codeFile;
      for(let i = 0; i < codeStageIds; i++) {
        const codeStageId = codeStageIds[i];
        await createSolution(codeStageId, codeFile.id);
      }
    }
    else {
      const { codeStageIds } = codeFile;
      for(let i = 0; i < codeStageIds; i++) {
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
        await fs.ensureFile(newPath);
        await fs.rename(previousPath, newPath);
    }
  }
}

async function modifyCodeFile(props) {
  const codeFile = await configResolver(MODEL_DB.CODE_FILES, props.id);
  const merged = { ...codeFile, ...props };

  const keys = Object.keys(props);
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if(onChange[key]) {
      await onChange[key](merged);
    }
  }

  const newPaths = await findCodeFilePaths(merged);
  const previousPaths = await findCodeFilePaths(codeFile);
  await rewritePaths(previousPaths, newPaths);

  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if(cfProjectProps[key]) {
      await Promise.all(newPaths.map(async (path) => {
        return await fileWriter(path, merged[key]);
      }));
      merged[key] = LOOKUP_KEY;
    }
  }

  return configWriter(MODEL_DB.CODE_FILES, merged);
}

module.exports = modifyCodeFile;
