const fs = require('fs-extra');
const path = require('path');

module.exports = (transaction) => {
  const rename = async (previousPath, newPath) => {
    if(fs.exists(previousPath)) {
      await fs.ensureDir(path.dirname(newPath));
      await fs.move(previousPath, newPath, { overwrite: true });

      transaction.add(async () => {
        await fs.move(newPath, previousPath, { overwrite: true });
      });
    }
    else {
      throw new Error(`Attempted to rename ${previousPath} to ${newPath}, however the former path does not exist!`)
    }
  }

  return rename;
}
