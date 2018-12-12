const { MODEL_DB } = require('../../../config');

module.exports = ({ configWriter, configRemove, configResolver, fileRemove }, { findCodeFilePaths }) => {
  async function unlinkCodeStages(codeFile) {
    const { codeStageIds } = codeFile;
    for(let i = 0; i < (codeStageIds || []).length; i++) {
      const codeStage = await configResolver(MODEL_DB.STAGES, codeStageIds[i]);
      const index = codeStage.codeFileIds.indexOf(codeFile.id);
      if(index >= 0) {
        codeStage.codeFileIds.splice(index, 1);
      }
      await configWriter(MODEL_DB.STAGES, codeStage);
    }
  }

  async function removeProjectFiles(codeFile) {
    const paths = await findCodeFilePaths(codeFile);
    await Promise.all(paths.map(fileRemove));
  }

  async function destroyCodeFile(id) {
    const codeFile = await configResolver(MODEL_DB.CODE_FILES, id);
    await unlinkCodeStages(codeFile);
    await removeProjectFiles(codeFile);
    await configRemove(MODEL_DB.CODE_FILES, id);
  }

  return destroyCodeFile;
}
