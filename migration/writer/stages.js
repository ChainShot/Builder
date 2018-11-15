const path = require('path');
const fs = require('fs-extra');
const {toFolderName, prettifyJSON, camelizeProps} = require('./utils');
const createCodeFiles = require('./codeFiles');
const COLLECTION = 'stages';
const { DB_DIR, LOOKUP_KEY } = require('../config');

const writeFiles = [
  { prop: 'task', file: 'task.md' },
  { prop: 'details', file: 'details.md' },
  { prop: 'abi_validations', file: 'validations.json', transform: x => x ? prettifyJSON(x) : '' },
]

const identity = x => x;
const create = async(db, folder, container_id) => {
  const cursor = db.collection(COLLECTION).find({ container_id });
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const newFolder = path.join(folder, toFolderName(doc.title));

      const props = { ...doc };
      writeFiles.forEach(({prop, file, transform = identity }) => {
        const fullPath = path.join(newFolder, file);
        fs.outputFile(fullPath, transform(props[prop]));
        props[prop] = LOOKUP_KEY;
      });
      const json = prettifyJSON(camelizeProps(props));

      const file = path.join(DB_DIR, COLLECTION, `${doc._id}.json`);
      await fs.outputFile(file, json);

      if(doc.language === 'solidity' || doc.language === 'vyper') {
          await ['truffle.js', 'truffle-config.js'].map(async (x) => {
            const configFile = path.join(newFolder, x);
            await fs.outputFile(configFile, `module.exports = {}`);
          });
          // ensure the migrations folder is committed to github
          await fs.outputFile(path.join(newFolder, 'migrations', '.gitignore'), '*\n!.gitignore')
      }

      await createCodeFiles(db, newFolder, doc._id);
  }
}

module.exports = create;
