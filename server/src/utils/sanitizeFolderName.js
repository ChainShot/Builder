const sanitize = require("sanitize-filename");
const camelize = require('./camelize');

function sanitizeFolderName(name) {
  return camelize(sanitize(name));
}

module.exports = sanitizeFolderName
