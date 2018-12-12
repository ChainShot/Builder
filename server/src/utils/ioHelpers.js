const { CONFIG_DIR } = require('../config');
const fs = require('fs-extra');
const path = require('path');
const sanitize = require("sanitize-filename");
const camelize = require('../utils/camelize');

const configResolver = (collection, id) => {
  if(!collection) throw new Error('Collection not provided to resolve!')
  if(!id) throw new Error(`id not provided to resolve for ${collection}!`)
  const filePath = path.join(CONFIG_DIR, collection, `${id}.json`);
  return fileResolver(filePath).then(JSON.parse);
}

async function fileResolver(filePath) {
  const contents = await fs.readFile(filePath);
  return contents && contents.toString();
}

async function rename(previousPath, newPath) {
  await fs.ensureFile(newPath);
  await fs.rename(previousPath, newPath);
}

const configWriter = (collection, props) => {
  if(!collection) throw new Error('Collection not provided to write to!')
  if(!props['id']) throw new Error(`id not defined for ${JSON.stringify(props)}`);
  const filePath = path.join(CONFIG_DIR, collection, `${props['id']}.json`);
  return fileWriter(filePath, prettifyJSON(props)).then(() => props);
}

function fileWriter(filePath, props) {
  return fs.outputFile(filePath, props);
}

const configRemove = (collection, id) => {
  if(!collection) throw new Error('Collection not provided to remove!')
  const filePath = path.join(CONFIG_DIR, collection, `${id}.json`);
  return fileRemove(filePath);
}

async function fileRemove(filePath) {
  if(await fs.exists(filePath)) {
    await fs.unlink(filePath);
  }
}

async function configReader(collection) {
  if(!collection) throw new Error('Collection not provided to read!')
  const folder = path.join(CONFIG_DIR, collection);
  const files = await fs.readdir(folder);
  return files.map(x => x.split(".json")[0]);
}

async function configDocumentReader(collection) {
  const ids = await configReader(collection);
  return Promise.all(ids.map(x => configResolver(collection, x)));
}

function sanitizeFolderName(name) {
  return camelize(sanitize(name));
}

function prettifyJSON(json) {
  return JSON.stringify(json, null, 2);
}

module.exports = {
  configResolver,
  configReader,
  configDocumentReader,
  configWriter,
  configRemove,
  rename,
  fileWriter,
  fileRemove,
  fileResolver,
  prettifyJSON,
  sanitizeFolderName,
}
