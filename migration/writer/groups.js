const path = require('path');
const fs = require('fs-extra');
const {toFolderName, prettifyJSON, camelizeProps, camelize} = require('./utils');
const createContainers = require('./containers');
const COLLECTION = 'stage_container_groups';
const { DB_DIR } = require('../config');

const create = async (db, folder) => {
  const cursor = db.collection(COLLECTION).find();
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const json = prettifyJSON(camelizeProps(doc));
      const newFolder = path.join(folder, toFolderName(doc.title));
      const file = path.join(DB_DIR, camelize(COLLECTION), `${doc._id}.json`);
      await fs.outputFile(file, json);
      await createContainers(db, newFolder, doc._id);
  }
}

module.exports = create;
