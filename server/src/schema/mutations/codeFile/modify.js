const { findCodeFilePaths } = require('../../../projectHelpers');
const {
  configWriter,
  fileWriter,
  configResolver,
} = require('../../../utils/ioHelpers');
const cfProjectProps = require('./projectProps');
const { LOOKUP_KEY, MODEL_DB } = require('../../../config');
const fs = require('fs-extra');

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

    const newPaths = await findCodeFilePaths(merged);
    const previousPaths = await findCodeFilePaths(codeFile);
    await rewritePaths(previousPaths, newPaths);

    const keys = Object.keys(props);
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
