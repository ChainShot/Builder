const fs = require('fs-extra');

module.exports = () => {
  const fileResolver = async (filePath) => {
    const contents = await fs.readFile(filePath);
    return contents && contents.toString();
  }

  return fileResolver;
}
