const path = require('path');
const CONFIG_DIR = require('../config');

module.exports = (transaction) => {
  const fileResolver = require('./fileResolver')(transaction);

  const configResolver = (collection, id) => {
    if(!collection) throw new Error('Collection not provided to resolve!')
    if(!id) throw new Error(`id not provided to resolve for ${collection}!`)
    const filePath = path.join(CONFIG_DIR, collection, `${id}.json`);
    return fileResolver(filePath).then(JSON.parse);
  }

  return configResolver;
}
