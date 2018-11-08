const {connect} = require('../mongo');
const fs = require('fs-extra');
const CONTENT_REPO = '../content';
const createGroups = require('./groups');

const execute = async () => {
  await fs.emptyDir(CONTENT_REPO);
  const { client, db } = await connect();
  try {
    await createGroups(db, CONTENT_REPO);
    console.log('Content Successfully Written');
  }
  catch(ex) {
    console.log(ex);
  }
  client.close();
}

module.exports = execute;
