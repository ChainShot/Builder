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
      const index = codeFile.codeStageIds.indexOf(stage.id);
      if(index >= 0) {
        // unlink this code stage from the code file
        codeFile.codeStageIds.splice(index, 1);
      }
      if(codeFile.codeStageIds.length === 0) {
        // if this is the last code stage, delete the code file
        await destroyCodeFile(codeFile.id);
      }
      else {
        // if there are other code stages, just update the ids
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
