const sanitize = require("sanitize-filename");
const fs = require('fs-extra');

function toFolderName(title) {
  const santized = sanitize(title);
  return santized.toLowerCase().replace(/\s/g, '_');
}

function prettifyJSON(json) {
  return JSON.stringify(json, null, 2);
}

function camelizeProps(props) {
  return Object.keys(props).reduce((obj, prop) => {
    return { ...obj, [camelize(prop)]: props[prop] }
  }, {});
}

function camelize(str) {
  if(str === '_id') return "id";
  let parts = str.split("_");
  return parts.slice(1).reduce((str, cur) => {
    return str + cur[0].toUpperCase() + cur.slice(1);
  }, parts[0]);
}

module.exports = { toFolderName, prettifyJSON, camelizeProps }
