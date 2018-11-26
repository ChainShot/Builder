const sanitize = require("sanitize-filename");
const fs = require('fs-extra');

function toFolderName(title) {
  return camelize(sanitize(title));
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
  if(str[0] === '_') return str.slice(1); // e.g. _id or _type
  let parts = str.split("_");
  return parts.slice(1).reduce((str, cur) => {
    return str + cur[0].toUpperCase() + cur.slice(1);
  }, parts[0]);
}

module.exports = { toFolderName, prettifyJSON, camelizeProps, camelize }
