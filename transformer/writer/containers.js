const path = require('path');
const fs = require('fs-extra');
const {toFolderName, prettifyJSON} = require('./utils');
const createStages = require('./stages');

const create = async (db, folder, stage_container_group_id) => {
  const cursor = db.collection('stage_containers').find({ stage_container_group_id });
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const json = prettifyJSON(doc);
      const newFolder = path.join(folder, toFolderName(doc.version));
      const file = path.join(newFolder, 'config.json');
      await fs.outputFile(file, json);
      await createStages(db, newFolder, doc._id);
  }
}

module.exports = create;
