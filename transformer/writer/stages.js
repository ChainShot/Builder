const path = require('path');
const fs = require('fs-extra');
const {toFolderName, prettifyJSON} = require('./utils');
const createCodeFiles = require('./codeFiles');

const create = async(db, folder, container_id) => {
  const cursor = db.collection('stages').find({ container_id });
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const json = prettifyJSON(doc);
      const newFolder = path.join(folder, toFolderName(doc.title));
      const file = path.join(newFolder, 'config.json');
      await fs.outputFile(file, json);
      await createCodeFiles(db, newFolder, doc._id);
  }
}

module.exports = create;
