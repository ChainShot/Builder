const { CONFIG_DIR } = require('../config');
const fs = require('fs-extra');
const path = require('path');
const sanitize = require("sanitize-filename");
const camelize = require('../utils/camelize');

const configResolver = (collection, id) => {
  if(!collection) throw new Error('Collection not provided to resolve!')
  const filePath = path.join(CONFIG_DIR, collection, `${id}.json`);
  return fileResolver(filePath).then(JSON.parse);
}

const fileResolver = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if(err) reject(err);
      resolve(data && data.toString());
    });
  });
}

const configWriter = (collection, props) => {
  if(!collection) throw new Error('Collection not provided to write to!')
  if(!props['id']) throw new Error(`id not defined for ${JSON.stringify(props)}`);
  const filePath = path.join(CONFIG_DIR, collection, `${props['id']}.json`);
  return fileWriter(filePath, prettifyJSON(props)).then(() => props);
}

const fileWriter = (filePath, props) => {
  return new Promise((resolve, reject) => {
    fs.outputFile(filePath, props, (err) => {
      if(err) reject(err);
      resolve(props);
    });
  });
}

const configRemove = (collection, id) => {
  if(!collection) throw new Error('Collection not provided to remove!')
  const filePath = path.join(CONFIG_DIR, collection, `${id}.json`);
  return fileRemove(filePath);
}

const fileRemove = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if(err) reject(err);
      resolve();
    });
  });
}

const configReader = (collection) => {
  if(!collection) throw new Error('Collection not provided to read!')
  const folder = path.join(CONFIG_DIR, collection);
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (err, files) => {
      if(err) reject(err);
      resolve(files.map(x => x.split(".json")[0]));
    });
  });
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
  configWriter,
  configRemove,
  fileWriter,
  fileRemove,
  fileResolver,
  prettifyJSON,
  sanitizeFolderName,
}
