const {connect} = require('../mongo');
const {toFolderName, prettifyJSON} = require('./utils');
const fs = require('fs-extra');
const path = require('path');
const CONTENT_REPO = '../content';

const createCodeFiles = async(db, folder, id) => {
  const cursor = db.collection('code_files').find({ code_stage_ids: { '$in': [id] }});
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const file = path.join(folder, `${doc.name}`);
      await fs.outputFile(file, doc.initial_code);
  }
}

const createStages = async(db, folder, container_id) => {
  const cursor = db.collection('stages').find({ container_id });
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const json = prettifyJSON(doc);
      const newFolder = path.join(folder, toFolderName(doc.title));
      const file = path.join(newFolder, 'config.json');
      await fs.outputFile(file, json);
      await createCodeFiles(db, newFolder, doc._id);
  }
}

const createContainers = async (db, folder, stage_container_group_id) => {
  const cursor = db.collection('stage_containers').find({ stage_container_group_id });
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const json = prettifyJSON(doc);
      const newFolder = path.join(folder, toFolderName(doc.version));
      const file = path.join(newFolder, 'config.json');
      await fs.outputFile(file, json);
      await createStages(db, newFolder, doc._id);
  }
}

const createGroups = async (db) => {
  const cursor = db.collection('stage_container_groups').find();
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const json = prettifyJSON(doc);
      const newFolder = path.join(CONTENT_REPO, toFolderName(doc.title));
      const file = path.join(newFolder, 'config.json');
      await fs.outputFile(file, json);
      await createContainers(db, newFolder, doc._id);
  }
}

const execute = async () => {
  await fs.emptyDir(CONTENT_REPO);
  const { client, db } = await connect();
  try {
    await createGroups(db);
    console.log('Content Successfully Written');
  }
  catch(ex) {
    console.log(ex);
  }
  client.close();
}

module.exports = execute;
