const { CONFIG_DIR, MODEL_DB, PROJECTS_DIR } = require('../../../config');
const { configReader, fileResolver, configResolver, sanitizeFolderName } = require('../../../utils/ioHelpers');
const getConfigFileParts = require('./getConfigFileParts');
const fs = require('fs-extra');
const schema = require('../../../schema');
const { graphql } = require('graphql');
const path = require('path');

const eq = x => y => x === y;
const diff = (a,b) => {
  const aMissing = a.filter(x => !b.find(eq(x)));
  const bMissing = b.filter(x => !a.find(eq(x)));
  return [aMissing, bMissing];
}

async function save(filename) {
  const { model, id } = getConfigFileParts(filename);
  const props = JSON.parse(await fileResolver(filename));

  const SCG_DB = MODEL_DB.STAGE_CONTAINER_GROUPS;
  if(model === SCG_DB) {
    const ids = await configReader(SCG_DB);
    const models = await Promise.all(ids.map((id) => configResolver(SCG_DB, id)));
    const titles = models.map(x => x.title).map(sanitizeFolderName);

    const dirents = await fs.readdir(baseFolder, { withFileType: true });
    const folderNames = dirents.filter(x => x.isDirectory()).map(x => x.name);

    const [newTitles, oldTitles] = diff(titles, folderNames);

    if(newTitles.length === 1 && oldTitles.length === 1) {
      const newTitle = newTitles[0];
      const oldTitle = oldTitles[0];
      await fs.rename(path.join(PROJECTS_DIR, oldTitle), path.join(PROJECTS_DIR, newTitle));
    }
  }

  const SC_DB = MODEL_DB.STAGE_CONTAINERS;
  const scQuery = `
  query findStageContainerGroup($stageContainerGroupId: String) {
    stageContainerGroup(id: $stageContainerGroupId) {
      title
      stageContainers {
        version
      }
    }
  }
  `;
  if(model === SC_DB) {
    const { data } = await graphql(schema, scQuery, null, null, { stageContainerGroupId: props.stageContainerGroupId });
    const { stageContainerGroup } = data;
    const { stageContainers } = stageContainerGroup;

    const baseFolder = path.join(PROJECTS_DIR, stageContainerGroup.title);

    const versions = stageContainers.map(x => x.version).map(sanitizeFolderName);

    const dirents = await fs.readdir(baseFolder, { withFileType: true });
    const folderNames = dirents.filter(x => x.isDirectory()).map(x => x.name);

    const [newVersions, oldVersions] = diff(versions, folderNames);

    if(newVersions.length === 1 && oldVersions.length === 1) {
      const newVersion = newVersions[0];
      const oldVersion = oldVersions[0];
      await fs.rename(path.join(baseFolder, oldVersion), path.join(baseFolder, newVersion));
    }
  }


  const S_DB = MODEL_DB.STAGES;
  const sQuery = `
  query findStageContainer($stageContainerId: String) {
    stageContainer(id: $stageContainerId) {
      version
      stages {
        title
      }
      stageContainerGroup {
        title
      }
    }
  }
  `;
  if(model === S_DB) {
    const { data } = await graphql(schema, sQuery, null, null, { containerId: props.containerId });
    const { stageContainer } = data;
    const { stages, stageContainerGroup } = stageContainer;

    const baseFolder = path.join(PROJECTS_DIR, stageContainerGroup.title, stageContainer.version);

    const titles = stages.map(x => x.title).map(sanitizeFolderName);

    const dirents = await fs.readdir(baseFolder, { withFileTypes: true });
    const folderNames = dirents
      .filter(x => x.isDirectory())
      .map(x => x.name)
      .filter(x => fs.readdirSync(path.join(baseFolder, x)).length > 0);

    const [newTitles, oldTitles] = diff(titles, folderNames);

    if(newTitles.length === 1 && oldTitles.length === 1) {
      const newTitle = newTitles[0];
      const oldTitle = oldTitles[0];
      await fs.rename(path.join(baseFolder, oldTitle), path.join(baseFolder, newTitle));
    }
  }

  if(model === MODEL_DB.CODE_FILES) {
    // did the codefile executionPath changed?
    if(true) {
      // changed the codefile name
    }
  }
}

module.exports = save;
