const path = require('path');
const fs = require('fs-extra');
const { toFolderName, prettifyJSON, fileResolver } = require('./utils');
const COLLECTION = 'code_files';
const { DB_DIR } = require('../config');

const create = async(db, folder, id) => {
  const cursor = db.collection(COLLECTION).find({ code_stage_ids: { '$in': [id] }});
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const defaultLocation = doc.test_fixture ? `test/${doc.name}` : doc.name;
      const location = doc.executable_path || defaultLocation;
      const codefilePath = path.join(folder, location);
      await fs.outputFile(codefilePath, doc.initial_code);

      const props = { ...doc };
      const filePath = path.join(DB_DIR, COLLECTION, `${doc._id}.json`);
      // read the file if it already exists
      const file = await fileResolver(filePath);
      props['initial_code'] = [
        ...(file && file.initial_code ? file.initial_code : []),
        codefilePath
      ]
      const json = prettifyJSON(props);
      await fs.outputFile(filePath, json);
  }
}

module.exports = create;
