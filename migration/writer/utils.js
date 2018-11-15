const sanitize = require("sanitize-filename");
const fs = require('fs-extra');

function toFolderName(title) {
  const santized = sanitize(title);
  return santized.toLowerCase().replace(/\s/g, '_');
}

function prettifyJSON(json) {
  return JSON.stringify(json, null, 2);
}

const fileResolver = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if(data) {
          resolve(JSON.parse(data.toString()));
      }
      else {
        resolve({});
      }
    });
  })
}

module.exports = { toFolderName, prettifyJSON, fileResolver }
