const findCodeFilePath = require('./findCodeFilePath');

const findCodeFilePaths = (codeFile) => {
  const { codeStageIds } = codeFile;
  const ids = (codeStageIds || []);
  return Promise.all(ids.map((id) => findCodeFilePath(id, codeFile)));
}

module.exports = findCodeFilePaths;
