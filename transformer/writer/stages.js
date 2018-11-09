const path = require('path');
const fs = require('fs-extra');
const {toFolderName, prettifyJSON} = require('./utils');
const createCodeFiles = require('./codeFiles');
const COLLECTION = 'stages';

const writeFiles = [
  { prop: 'task', file: 'task.md' },
  { prop: 'details', file: 'details.md' },
  { prop: 'abi_validations', file: 'validations.json', transform: prettifyJSON },
]

const identity = x => x;
const create = async(db, folder, container_id) => {
  const cursor = db.collection(COLLECTION).find({ container_id });
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const newFolder = path.join(folder, toFolderName(doc.title));

      const props = { ...doc };
      writeFiles.forEach(({prop, file, transform = identity }) => {
        fs.outputFile(path.join(newFolder, file), transform(props[prop]));
        props[prop] = file;
      });
      const json = prettifyJSON(props);

      const file = path.join(newFolder, `${COLLECTION}_${doc._id}.json`);
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
