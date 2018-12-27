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
    const templateConfigPath = path.join(TEMPLATES_DIR, MODEL_DB.STAGES, template, 'config');

    const stagePath = path.join(templateConfigPath, MODEL_DB.STAGES);
    const stageDocName = (await fs.readdir(stagePath))[0];
    const stageDoc = await fs.readFile(path.join(stagePath, stageDocName));
    let stage = JSON.parse(stageDoc.toString());
    stage.id = ObjectID().toString();
    stage.title = title;
    stage.containerId = containerId;
    stage.codeFileIds = [];

    const codeFileIdChanges = [];
    const codeFilePath = path.join(templateConfigPath, MODEL_DB.CODE_FILES);
    const codeFileDocs = await fs.readdir(codeFilePath);
    for(let i = 0; i < codeFileDocs.length; i++) {
      const doc = await fs.readFile(path.join(codeFilePath, codeFileDocs[i]));
      const props = JSON.parse(doc.toString());
      const newId = ObjectID().toString();
      codeFileIdChanges[props.id] = newId;
      props.codeStageIds = [stage.id];
      props.stageContainerId = containerId;
      props.id = newId;
      stage.codeFileIds.push(props.id);
      await configWriter(MODEL_DB.CODE_FILES, props);
    }

    const solutionsPath = path.join(templateConfigPath, MODEL_DB.SOLUTIONS);
    const solutionDocs = await fs.readdir(solutionsPath);
    for(let i = 0; i < solutionDocs.length; i++) {
      const doc = await fs.readFile(path.join(solutionsPath, solutionDocs[i]));
      const props = JSON.parse(doc.toString());
      const newId = ObjectID().toString();
      props.codeFileId = codeFileIdChanges[props.codeFileId];
      props.stageId = stage.id;
      props.id = newId;
      await configWriter(MODEL_DB.SOLUTIONS, props);
    }

    await configWriter(MODEL_DB.STAGES, stage);

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
