const {connect} = require('../mongo');
const fs = require('fs-extra');
const { PROJECT_DIR, CONTENT_DIR } = require('../config');
const createGroups = require('./groups');

const execute = async () => {
  await fs.emptyDir(CONTENT_DIR);
  const { client, db } = await connect();
  try {
    await createGroups(db, PROJECT_DIR);
    console.log('Content Successfully Written');
  }
  catch(ex) {
    console.log(ex);
  }
  client.close();
}

module.exports = execute;
