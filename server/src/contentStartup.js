const fs = require('fs-extra');
const path = require('path');
const {CONTENT_DIR, CONFIG_DIR, TEMPLATES_DIR, PROJECTS_DIR, MODEL_DB} = require('./config');

// setups the content directory
// if this content initialization, also add readme
async function contentStartup(initialization) {
  await fs.ensureDir(CONTENT_DIR);
  if(initialization) {
    fs.copy(path.join(TEMPLATES_DIR, 'README.md'), path.join(CONTENT_DIR, 'README.md'));
  }
  await fs.ensureDir(CONFIG_DIR);
  await fs.ensureDir(PROJECTS_DIR);
  const values = Object.values(MODEL_DB);
  for(let i = 0; i < values.length; i++) {
    fs.ensureDir(`${CONFIG_DIR}${path.sep}${values[i]}`);
  }
}

module.exports = contentStartup;
