const { MODEL_DB, LOOKUP_KEY } = require('../../../config');
const { ObjectID } = require('mongodb');
const stageProjectProps = require('./projectProps');
const path = require('path');

module.exports = ({ configWriter, fileWriter }, { findStageFilePath }) => {
  async function createDocument({ ...props }) {
    Object.keys(stageProjectProps).forEach(key => {
      props[key] = LOOKUP_KEY;
    })
    return await configWriter(MODEL_DB.STAGES, props);
  }

  async function createProjectFiles(props) {
    const keys = Object.keys(props);
    for(let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if(stageProjectProps[key]) {
        const basePath = await findStageFilePath(props);
        const newPath = path.join(basePath, stageProjectProps[key]);
        const contents = props[key];
        await fileWriter(newPath, contents);
      }
    }
  }

  async function createStage(props) {
    props.id = ObjectID().toString();
    const stage = await createDocument(props);
    await createProjectFiles(props);
    return stage;
  }

  return createStage;
}
