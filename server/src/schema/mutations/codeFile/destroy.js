module.exports = ({
  ioHelpers: { configWriter, configRemove, configDocumentReader, configResolver, fileRemove },
  projectHelpers: { findCodeFilePaths },
  config: { MODEL_DB },
}) => {
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

  async function removeSolutions(codeFile) {
    const solutions = await configDocumentReader(MODEL_DB.SOLUTIONS);
    const relevant = solutions.filter(x => x.codeFileId === codeFile.id);
    for(let i = 0; i < relevant.length; i++) {
      await configRemove(MODEL_DB.SOLUTIONS, relevant[i].id);
    }
  }

  async function destroyCodeFile(id) {
    const codeFile = await configResolver(MODEL_DB.CODE_FILES, id);
    await unlinkCodeStages(codeFile);
    await removeProjectFiles(codeFile);
    await removeSolutions(codeFile);
    await configRemove(MODEL_DB.CODE_FILES, id);
  }

  return destroyCodeFile;
}
