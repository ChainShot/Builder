const { ObjectID } = require('mongodb');
const positionalShift = require('./positionalShift');

module.exports = (injections) => {
  const createSolution = require('../solution/create')(injections);
  const {
    ioHelpers: { configWriter, configResolver, copy, configDocumentReader },
    projectHelpers: { findStageFilePath },
    config: { LOOKUP_KEY, MODEL_DB },
  } = injections;

  async function copyProjectFiles(oldStage, newStage) {
    const oldBasePath = await findStageFilePath(oldStage);
    const newBasePath = await findStageFilePath(newStage);
    await copy(oldBasePath, newBasePath);
  }

  async function duplicateStage(props) {
    const stage = await configResolver(MODEL_DB.STAGES, props.id);
    const newStage = {
      ...stage,
      id: ObjectID().toString(),
      title: props.title,
      position: props.position,
    }

    // copy all the project files forward
    // including codefile/solution project files
    await copyProjectFiles(stage, newStage);

    if(props.createNew) {
      // create the code file and solution models
      for(let i = 0; i < (newStage.codeFileIds || []).length; i++) {
        const codeFileId = newStage.codeFileIds[i];
        const codeFile = await configResolver(MODEL_DB.CODE_FILES, codeFileId);
        if(codeFile.hasProgress) {
          // link to the previous code file
          codeFile.codeStageIds.push(newStage.id);
          // create a new solution
          await configWriter(MODEL_DB.SOLUTIONS, {
            id: ObjectID().toString(),
            stageId: newStage.id,
            codeFileId,
            code: LOOKUP_KEY,
          });
        }
        else {
          const oldId = codeFile.id;
          // create a new code file
          codeFile.id = ObjectID().toString();
          codeFile.codeStageIds = [newStage.id];
          // replace the old code file id on the new stage
          const idx = newStage.codeFileIds.indexOf(oldId);
          newStage.codeFileIds[idx] = codeFile.id;
        }
        await configWriter(MODEL_DB.CODE_FILES, codeFile);
      }
    }
    
    // create the stage model
    await configWriter(MODEL_DB.STAGES, newStage);

    if(!props.createNew) {
      // link the existing code files to this new stage
      for(let i = 0; i < (newStage.codeFileIds || []).length; i++) {
        const codeFileId = newStage.codeFileIds[i];
        const codeFile = await configResolver(MODEL_DB.CODE_FILES, codeFileId);
        codeFile.codeStageIds.push(newStage.id);
        await configWriter(MODEL_DB.CODE_FILES, codeFile);

        if(codeFile.hasProgress) {
          await createSolution(newStage.id, codeFile.id);
        }
      }
    }

    // shift stages around to keep everything zero-based
    const stages = await configDocumentReader(MODEL_DB.STAGES);
    const relevant = stages.filter(x => x.containerId === stage.containerId);
    positionalShift(relevant, newStage.id);
    for(let i = 0; i < relevant.length; i++) {
      await configWriter(MODEL_DB.STAGES, relevant[i]);
    }

    return newStage;
  }

  return duplicateStage;
}
