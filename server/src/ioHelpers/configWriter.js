const path = require('path');
const {CONFIG_DIR} = require('../config');
const prettifyJSON = require('../utils/prettifyJSON');

module.exports = (transaction) => {
  const fileWriter = require('./fileWriter')(transaction);

  const configWriter = async (collection, props) => {
    if(!collection) throw new Error('Collection not provided to write to!')
    if(!props['id']) throw new Error(`id not defined for ${JSON.stringify(props)}`);
    const filePath = path.join(CONFIG_DIR, collection, `${props['id']}.json`);
    await fileWriter(filePath, prettifyJSON(props));
    return props;
  }

  return configWriter;
}
