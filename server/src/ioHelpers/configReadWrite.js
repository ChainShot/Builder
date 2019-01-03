const path = require('path');
const {CONFIG_DIR} = require('../config');

module.exports = (transaction) => {
  const fileWriter = require('./fileWriter')(transaction);
  // this function performs a synchronous read followed by an asynchronous write
  // since node.js is single-threaded and builder is meant to run within one process
  // this means builder will not modify the file between the read and the write
  // other than the the transform function which is passed in by the caller
  const configReadWrite = async (collection, id, transformFn) => {
    if(!collection) throw new Error('Collection not provided to resolve!')
    if(!id) throw new Error(`id not provided to resolve for ${collection}!`)
    const filePath = path.join(CONFIG_DIR, collection, `${id}.json`);
    const contents = fs.readFileSync(filePath);
    return contents && contents.toString();
    const parsed = JSON.parse(contents);
    const transformed = transformFn(parsed);
    return fileWriter(filePath, prettifyJSON(transformed));
  }

  return configReadWrite;
}
