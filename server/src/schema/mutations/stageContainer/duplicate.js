const { ObjectID } = require('mongodb');
const duplicateStageExport = require('../stage/duplicate');
const createProjectFilesExport = require('./createProjectFiles');

module.exports = (injections) => {
  const {
    ioHelpers: { configWriter, configResolver, copy, configDocumentReader },
    projectHelpers: { findStageFilePath },
    config: { LOOKUP_KEY, MODEL_DB },
  } = injections;

  const duplicateStage = duplicateStageExport(injections);
  const createProjectFiles = createProjectFilesExport(injections);

  async function duplicateStageContainer(props) {
    const stageContainer = await configResolver(MODEL_DB.STAGE_CONTAINERS, props.id);
    const newStageContainer = {
      ...stageContainer,
      id: ObjectID().toString(),
      version: props.version,
      stageContainerGroupId: props.stageContainerGroupId,
      type: props.type,
      intro: props.intro,
    }

    // create the stage container
    await configWriter(MODEL_DB.STAGE_CONTAINERS, newStageContainer);
    await createProjectFiles(newStageContainer);

    // duplicate all the stages
    const stages = await configDocumentReader(MODEL_DB.STAGES);
    const relevantStages = stages.filter(x => x.containerId === props.id);

    // find all the code files in the relevant stages and create config files first
    const relevantCodeFileIds = relevantStages.reduce((codeFileIds, stage) => {
      let newArr = codeFileIds.slice(0);
      for(let i = 0; i < stage.codeFileIds.length; i++) {
        const codeFileId = stage.codeFileIds[i];
        if(codeFileIds.indexOf(codeFileId) < 0) {
          newArr.push(codeFileId);
        }
      }
      return newArr;
    }, []);

    const translatedCodeFiles = {}
    // create the code file configs for the stages to be linked to
    for(let i = 0; i < relevantCodeFileIds.length; i++) {
      const codeFileId = relevantCodeFileIds[i];
      const codeFile = await configResolver(MODEL_DB.CODE_FILES, codeFileId);

      // create a new id for this code file and store the mapping
      // so the stage duplication process can use it
      const newId = ObjectID().toString();
      translatedCodeFiles[codeFileId] = newId;
      codeFile.id = newId;

      // these will get linked up in the duplicate stage process
      codeFile.codeStageIds = [];
      codeFile.stageContainerId = newStageContainer.id;

      await configWriter(MODEL_DB.CODE_FILES, codeFile);
    }

    // then duplicate the stages, where createNew is set to false
    // so that all stages are linked to the existing code files
    // and new solutions are created accordingly
    for(let i = 0; i < relevantStages.length; i++) {
      const stage = relevantStages[i];
      const newStage = {
        ...stage,
        codeFileIds: stage.codeFileIds.map(x => translatedCodeFiles[x]),
        validatedFileId: translatedCodeFiles[stage.validatedFileId],
      }
      
      await duplicateStage(newStage, {
        newStageContainerId: newStageContainer.id,
        shiftPositions: false
      });
    }

    return newStageContainer;
  }

  return duplicateStageContainer;
}
