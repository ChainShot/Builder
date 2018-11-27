const { DB_DIR } = require('../config');
const fs = require('fs-extra');
const path = require('path');
const sanitize = require("sanitize-filename");
const camelize = require('../utils/camelize');

const dbResolver = (collection, id) => {
  const filePath = path.join(DB_DIR, collection, `${id}.json`);
  return fileResolver(filePath).then(JSON.parse);
}

const fileResolver = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if(err) reject(err);
      resolve(data && data.toString());
    });
  })
}

const dbWriter = (collection, props) => {
  if(!props['id']) throw new Error(`id not defined for ${JSON.stringify(props)}`);
  const filePath = path.join(DB_DIR, collection, `${props['id']}.json`);
  return fileWriter(filePath, prettifyJSON(props)).then(() => props);
}

const fileWriter = (filePath, props) => {
  return new Promise((resolve, reject) => {
    fs.outputFile(filePath, props, (err) => {
      if(err) reject(err);
      resolve(props);
    });
  })
}

const fileRemove = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if(err) reject(err);
      resolve();
    });
  })
}

const dbReader = (collection) => {
  const folder = path.join(DB_DIR, collection);
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (err, files) => {
      if(err) reject(err);
      resolve(files.map(x => x.split(".json")[0]));
    });
  })
}

function sanitizeFolderName(name) {
  return camelize(sanitize(name));
}

function prettifyJSON(json) {
  return JSON.stringify(json, null, 2);
}

module.exports = {
  dbResolver,
  dbReader,
  dbWriter,
  fileWriter,
  fileRemove,
  fileResolver,
  prettifyJSON,
  sanitizeFolderName,
}
