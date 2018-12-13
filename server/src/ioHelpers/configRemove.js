const path = require('path');
const CONFIG_DIR = require('../config');

module.exports = (transaction) => {
  const fileRemove = require('./fileRemove')(transaction);

  const configRemove = (collection, id) => {
    if(!collection) throw new Error('Collection not provided to remove!')
    const filePath = path.join(CONFIG_DIR, collection, `${id}.json`);
    return fileRemove(filePath);
  }

  return configRemove;
}
