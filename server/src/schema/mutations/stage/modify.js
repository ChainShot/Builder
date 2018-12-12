const { findStageFilePath } = require('../../../projectHelpers');
const { configWriter, fileWriter, configResolver } = require('../../../utils/ioHelpers');
const { LOOKUP_KEY, MODEL_DB } = require('../../../config');
const stageProjectProps = require('./projectProps');
const path = require('path');
const fs = require('fs-extra');

async function modifyStage(props) {
  const stage = await configResolver(MODEL_DB.STAGES, props.id);
  const merged = { ...stage, ...props };

  const newBasePath = await findStageFilePath(merged);
  const previousBasePath = await findStageFilePath(stage);

  if(newBasePath !== previousBasePath) {
    await fs.rename(previousBasePath, newBasePath)
  }

  const keys = Object.keys(props);
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if(stageProjectProps[key]) {
      const filePath = path.join(newBasePath, stageProjectProps[key]);
      await fileWriter(filePath, merged[key]);
      merged[key] = LOOKUP_KEY;
    }
  }

  return configWriter(MODEL_DB.STAGES, merged);
}

module.exports = modifyStage;
