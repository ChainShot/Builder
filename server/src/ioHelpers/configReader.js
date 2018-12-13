const path = require('path');
const fs = require('fs-extra');
const {CONFIG_DIR} = require('../config');

module.exports = () => {
  const configReader = async (collection) => {
    if(!collection) throw new Error('Collection not provided to read!')
    const folder = path.join(CONFIG_DIR, collection);
    const files = await fs.readdir(folder);
    return files.map(x => x.split(".json")[0]);
  }

  return configReader;
}
