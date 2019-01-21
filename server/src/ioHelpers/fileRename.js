const fs = require('fs-extra');

module.exports = (transaction) => {
  const fileRename = async (previousPath, newPath) => {
    let previousContents;
    if(await fs.exists(newPath)) {
      previousContents = await fs.readFile(newPath);
    }

    await fs.move(previousPath, newPath, { overwrite: true });

    transaction.add(async () => {
      // move the renamed file back
      await fs.move(newPath, previousPath, { overwrite: true });
      if(previousContents) {
        // restore the old contents that use to be here
        await fs.writeFile(newPath, previousContents.toString());
      }
    });
  }

  return fileRename;
}
