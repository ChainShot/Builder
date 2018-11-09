const {connect} = require('../mongo');
const fs = require('fs-extra')
const CONTENT_REPO = '../content';
const path = require('path');

const loadGroup = async (folder) => {
  // TODO: drop the collection
  const configPath = path.join(CONTENT_REPO, folder, 'config.json');
  const config = fs.readFileSync(configPath);
  console.log(config.toString())
}

const execute = async () => {
  const { client, db } = await connect();
  try {
    await fs.readdirSync(CONTENT_REPO).forEach(loadGroup)
    console.log('Content Successfully Loaded');
  }
  catch(ex) {
    console.log(ex);
  }
  client.close();
}

module.exports = execute;
