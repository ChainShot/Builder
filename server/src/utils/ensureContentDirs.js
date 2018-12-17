const fs = require('fs-extra');
const {sep} = require('path');
const {CONFIG_DIR, PROJECTS_DIR, MODEL_DB} = require('../config');

async function ensureContentDirs() {
  await fs.ensureDir(CONFIG_DIR);
  await fs.ensureDir(PROJECTS_DIR);
  const values = Object.values(MODEL_DB);
  for(let i = 0; i < values.length; i++) {
    fs.ensureDir(`${CONFIG_DIR}${sep}${values[i]}`);
  }
}

module.exports = ensureContentDirs;
