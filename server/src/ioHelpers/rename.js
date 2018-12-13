const fs = require('fs-extra');

module.exports = (transaction) => {
  const rename = async (previousPath, newPath) => {
    if(fs.exists(previousPath)) {
      await fs.rename(previousPath, newPath);

      transaction.add(async () => {
        await fs.rename(newPath, previousPath);
      });
    }
    else {
      throw new Error(`Attempted to rename ${previousPath} to ${newPath}, however the former path does not exist!`)
    }
  }

  return rename;
}
