const { ObjectID } = require('mongodb');
const stageProjectProps = require('./projectProps');
const path = require('path');
const fs = require('fs-extra');

module.exports = ({
  ioHelpers: { configWriter, fileWriter },
  projectHelpers: { findStageFilePath },
  config: { MODEL_DB, LOOKUP_KEY, TEMPLATES_DIR },
}) => {
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

  async function buildTemplate(template) {
    console.log(TEMPLATES_DIR);
    // fs.readDir(__dirname, )
  }

  async function createStage(props) {
    if(props.template) {
      return buildTemplate(props.template);
    }
    else {
      props.id = ObjectID().toString();
      const stage = await createDocument(props);
      await createProjectFiles(props);
      return stage;
    }
  }

  return createStage;
}
