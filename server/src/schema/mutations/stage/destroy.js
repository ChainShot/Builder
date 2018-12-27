const stageProjectProps = require('./projectProps');
const path = require('path');

module.exports = (injections) => {
  const destroyCodeFile = require('../codeFile/destroy')(injections);
  const {
    config: { MODEL_DB },
    ioHelpers: { configWriter, configRemove, configResolver, fileRemove },
    projectHelpers: { findStageFilePath },
  } = injections;

  async function destroyProjectFiles(stage) {
    const stagePath = await findStageFilePath(stage);
    const keys = Object.keys(stageProjectProps);
    for(let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const file = stageProjectProps[key];
      await fileRemove(path.join(stagePath, file));
    }
  }

  async function unlinkCodeFiles(stage) {
    const { codeFileIds } = stage;
    for(let i = 0; i < (codeFileIds || []).length; i++) {
      const codeFile = await configResolver(MODEL_DB.CODE_FILES, codeFileIds[i]);
      const index = codeFileIds.indexOf(codeFile.id);
      if(index >= 0) {
        codeFileIds.splice(index, 1);
      }
      if(codeFileIds.length === 0) {
        await destroyCodeFile(codeFile.id);
      }
      else {
        await configWriter(MODEL_DB.CODE_FILES, codeFile);
      }
    }
  }

  async function destroyStage(id) {
    const stage = await configResolver(MODEL_DB.STAGES, id);
    await destroyProjectFiles(stage);
    await unlinkCodeFiles(stage);
    await configRemove(MODEL_DB.STAGES, id);
  }

  return destroyStage;
}
