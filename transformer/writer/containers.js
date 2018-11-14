const path = require('path');
const fs = require('fs-extra');
const {toFolderName, prettifyJSON} = require('./utils');
const createStages = require('./stages');
const COLLECTION = 'stage_containers';
const { DB_DIR } = require('../config');

const writeFiles = [
  { prop: 'intro', file: 'intro.md' },
]

const create = async (db, folder, stage_container_group_id) => {
  const cursor = db.collection(COLLECTION).find({ stage_container_group_id });
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const newFolder = path.join(folder, toFolderName(doc.version));
      const props = { ...doc };

      writeFiles.forEach(({prop, file}) => {
        const fullPath = path.join(newFolder, file);
        fs.outputFile(fullPath, props[prop]);
        props[prop] = fullPath;
      });

      const json = prettifyJSON(props);
      const file = path.join(DB_DIR, COLLECTION, `${doc._id}.json`);
      await fs.outputFile(file, json);
      await createStages(db, newFolder, doc._id);
  }
}

module.exports = create;
