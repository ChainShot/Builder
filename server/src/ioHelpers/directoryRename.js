const fs = require('fs-extra');
const path = require('path');
const { build, write } = require('./directoryMemory');

module.exports = (transaction) => {
  const directoryRename = async (previousPath, newPath) => {
    let memory;
    if(await fs.exists(newPath)) {
      memory = await build(newPath);
    }
    else {
      await fs.ensureDir(path.dirname(newPath));
    }
    await fs.move(previousPath, newPath, { overwrite: true });

    transaction.add(async () => {
      // move the renamed contents back
      await fs.move(newPath, previousPath, { overwrite: true });
      if(memory) {
        // restore the old contents that use to be here
        await write(newPath, memory);
      }
    });
  }

  return directoryRename;
}
