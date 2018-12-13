const fs = require('fs-extra');

module.exports = (transaction) => {
  const fileRemove = async (filePath) => {
    if(await fs.exists(filePath)) {
      const contents = await fs.readFile(filePath);

      await fs.unlink(filePath);

      transaction.add(async () => {
        await fs.outputFile(filePath, contents.toString);
      });
    }
  }

  return fileRemove;
}
