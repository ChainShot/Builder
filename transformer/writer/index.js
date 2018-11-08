const {connect} = require('../mongo');
const fs = require('fs-extra');
const CONTENT_REPO = '../content';
const createGroups = require('./groups');

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

const execute = async () => {
  await fs.emptyDir(CONTENT_REPO);
  const { client, db } = await connect();
  try {
    await createGroups(db, CONTENT_REPO);
    console.log('Content Successfully Written');
  }
  catch(ex) {
    console.log(ex);
  }
  client.close();
}

module.exports = execute;
