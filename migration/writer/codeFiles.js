const path = require('path');
const fs = require('fs-extra');
const { toFolderName, prettifyJSON, camelizeProps, camelize } = require('./utils');
const COLLECTION = 'code_files';
const { DB_DIR, LOOKUP_KEY } = require('../config');

const create = async(db, folder, id) => {
  const cursor = db.collection(COLLECTION).find({ code_stage_ids: { '$in': [id] }});
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const codefilePath = path.join(folder, doc.executable_path);
      await fs.outputFile(codefilePath, doc.initial_code);

      const props = { ...doc };
      const filePath = path.join(DB_DIR, camelize(COLLECTION), `${doc._id}.json`);
      props['initial_code'] = LOOKUP_KEY;
      const json = prettifyJSON(camelizeProps(props));
      await fs.outputFile(filePath, json);
  }
}

module.exports = create;
