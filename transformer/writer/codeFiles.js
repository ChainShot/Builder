const path = require('path');
const fs = require('fs-extra');
const {toFolderName, prettifyJSON} = require('./utils');

const create = async(db, folder, id) => {
  const cursor = db.collection('code_files').find({ code_stage_ids: { '$in': [id] }});
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const file = path.join(folder, `${doc.name}`);
      await fs.outputFile(file, doc.initial_code);
  }
}

module.exports = create;
