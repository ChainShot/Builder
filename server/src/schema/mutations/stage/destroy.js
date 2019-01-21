const positionalShift = require('./positionalShift');

module.exports = (injections) => {
  const {
    config: { MODEL_DB },
    ioHelpers: { configWriter, configRemove, configResolver, configDocumentReader, directoryRemove },
    projectHelpers: { findStageFilePath },
  } = injections;

  async function destroyProjectFiles(stage) {
    const stagePath = await findStageFilePath(stage);
    await directoryRemove(stagePath);
  }

  async function removeSolutions(stageId) {
    const solutions = await configDocumentReader(MODEL_DB.SOLUTIONS);
    for(let i = 0; i < solutions.length; i++) {
      if(solutions[i].stageId === stageId) {
        await configRemove(MODEL_DB.SOLUTIONS, solutions[i].id);
      }
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
        await configRemove(MODEL_DB.CODE_FILES, codeFile.id);

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
    await removeSolutions(stage.id);

    // shift stages around to keep everything zero-based
    const stages = await configDocumentReader(MODEL_DB.STAGES);
    const relevant = stages.filter(x => x.containerId === stage.containerId);
    positionalShift(relevant);
    for(let i = 0; i < relevant.length; i++) {
      await configWriter(MODEL_DB.STAGES, relevant[i]);
    }
  }

  return destroyStage;
}
