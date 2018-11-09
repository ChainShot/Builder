const path = require('path');
const fs = require('fs-extra');
const {toFolderName, prettifyJSON} = require('./utils');
const COLLECTION = 'code_files';

const create = async(db, folder, id) => {
  const cursor = db.collection(COLLECTION).find({ code_stage_ids: { '$in': [id] }});
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      // write the initial code file
      const defaultLocation = doc.test_fixture ? `test/${doc.name}` : doc.name;
      const location = doc.executable_path || defaultLocation;
      const codefile = path.join(folder, location);
      await fs.outputFile(codefile, doc.initial_code);

      const props = { ...doc };
      props['initial_code'] = location;
      const json = prettifyJSON(props);
      const file = path.join(folder, `${COLLECTION}_${doc._id}.json`);
      await fs.outputFile(file, json);
  }
}

module.exports = create;
