const fs = require('fs-extra');
const path = require('path');

module.exports = (transaction) => {
  const copy = async (previousPath, newPath) => {
    if(fs.exists(previousPath)) {
      await fs.ensureDir(path.dirname(newPath));
      await fs.copy(previousPath, newPath);

      transaction.add(async () => {
        await fs.remove(newPath);
      });
    }
    else {
      throw new Error(`Attempted to copy ${previousPath} to ${newPath}, however the former path does not exist!`)
    }
  }

  return copy;
}
