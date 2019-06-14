const { ObjectID } = require('mongodb');
const stageProjectProps = require('./projectProps');
const positionalShift = require('./positionalShift');
const path = require('path');
const fs = require('fs-extra');

module.exports = ({
  ioHelpers: { configWriter, fileWriter, configDocumentReader, configResolver, rename },
  projectHelpers: { findStageFilePath },
  config: { LOOKUP_KEY, MODEL_DB },
}) => {
  const onChange = {
    projectSkeletons: (stage) => {
      stage.projectSkeletons.forEach((skeleton) => {
        if(!skeleton.id) {
          skeleton.id = ObjectID().toString();
        }
      })
    }
  }

  async function modifyStage(props) {
    const stage = await configResolver(MODEL_DB.STAGES, props.id);
    const merged = { ...stage, ...props };

    const newBasePath = await findStageFilePath(merged);
    const previousBasePath = await findStageFilePath(stage);

    if(newBasePath !== previousBasePath) {
      if(await fs.exists(newBasePath)) {
        throw new Error(`Cannot overwrite stage with the same name!`);
      }
      await rename(previousBasePath, newBasePath);
    }

    const keys = Object.keys(props);
    for(let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if(stage[key] !== merged[key]) {
        if(onChange[key]) {
          onChange[key](merged);
        }
        if(stageProjectProps[key]) {
          const filePath = path.join(newBasePath, stageProjectProps[key]);
          await fileWriter(filePath, merged[key]);
          merged[key] = LOOKUP_KEY;
        }
      }
    }

    await configWriter(MODEL_DB.STAGES, merged);

    // shift stages around to keep everything zero-based
    const stages = await configDocumentReader(MODEL_DB.STAGES);
    const relevant = stages.filter(x => x.containerId === stage.containerId);
    positionalShift(relevant, props.id);
    for(let i = 0; i < relevant.length; i++) {
      await configWriter(MODEL_DB.STAGES, relevant[i]);
    }

    return merged;
  }

  return modifyStage;
}
