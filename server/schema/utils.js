const { DB_DIR } = require('../config');
const fs = require('fs');
const path = require('path');

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

const dbReader = (collection) => {
  const folder = path.join(DB_DIR, collection);
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (err, files) => {
      if(err) reject(err);
      resolve(files.map(x => x.split(".json")[0]));
    });
  })
}

module.exports = {
  dbResolver,
  dbReader,
  fileResolver,
}
