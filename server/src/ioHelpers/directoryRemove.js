const { build, write } = require('./directoryMemory');
const fs = require('fs-extra');

module.exports = (transaction) => {
  const directoryRemove = async (dirPath) => {
    if(await fs.exists(dirPath)) {
      const memory = await build(dirPath);

      await fs.remove(dirPath);

      transaction.add(async () => {
        await write(dirPath, memory);
      });
    }
  }

  return directoryRemove;
}
