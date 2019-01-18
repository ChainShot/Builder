const fs = require('fs-extra');

module.exports = () => {
  const exists = async (filePath) => {
    return fs.exists(filePath);
  }

  return exists;
}
