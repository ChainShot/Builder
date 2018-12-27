const { ObjectID } = require('mongodb');
const stageProjectProps = require('./projectProps');
const path = require('path');
const fs = require('fs-extra');

module.exports = ({
  ioHelpers: { configWriter, configResolver, fileWriter, copy },
  projectHelpers: { findStageFilePath },
  config: { MODEL_DB, LOOKUP_KEY, TEMPLATES_DIR, PROJECTS_DIR },
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

  async function buildTemplate({title, containerId, template}) {
    // copy all config docs and replace the IDs
    let stage;
    const templateConfigPath = path.join(TEMPLATES_DIR, MODEL_DB.STAGES, template, 'config');
    const collections = await fs.readdir(templateConfigPath);
    for(let i = 0; i < collections.length; i++) {
      const collection = collections[i];
      const collectionPath = path.join(templateConfigPath, collection);
      const docs = await fs.readdir(collectionPath);
      for(let j = 0; j < docs.length; j++) {
        const doc = await fs.readFile(path.join(collectionPath, docs[j]));
        const props = JSON.parse(doc.toString());
        if(collection === 'stages') {
          props.title = title;
          props.containerId = containerId;
          stage = props;
        }
        props.id = ObjectID().toString();
        await configWriter(collection, props);
      }
    }
    
    const templateProjectsPath = path.join(TEMPLATES_DIR, MODEL_DB.STAGES, template, 'projects');
    const outputPath = await findStageFilePath(stage);
    const projects = await copy(templateProjectsPath, outputPath);

    return stage;
  }

  async function createStage(props) {
    if(props.template) {
      return buildTemplate(props);
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
