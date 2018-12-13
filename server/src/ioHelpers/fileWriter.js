const fs = require('fs-extra');

module.exports = (transaction) => {
  const fileWriter = async (filePath, props) => {
    let beforeContents;
    const previouslyExisted = await fs.exists(filePath);
    if(previouslyExisted) {
      beforeContents = await fs.readFile(filePath);
    }

    await fs.outputFile(filePath, props);

    if(previouslyExisted) {
      // reverse function is to revert the modifications
      transaction.add(async () => {
        await fs.outputFile(filePath, beforeContents.toString());
      });
    }
    else {
      // reverse function is deletion of the file
      transaction.add(async () => {
        await fs.unlink(filePath);
      });
    }

    return props;
  }

  return fileWriter;
}
