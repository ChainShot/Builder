const axios = require('axios');
const { RUN_URL } = require('../config');

async function executeStage(stage) {
  const files = stage.codeFiles
    .filter(x => x.executable)
    .map(({ id, initialCode, executablePath, hasProgress }) => {
      if (hasProgress) {
        const solution = stage.solutions.find(x => x.codeFileId === id);
        return { contents: solution.code, path: executablePath }
      }
      return { contents: initialCode, path: executablePath }
    });

  const { language, forkBlockNumber, languageVersion } = stage;

  return axios.post(RUN_URL, {
    files,
    language,
    languageVersion,
    forkBlockNumber
  });
}

module.exports = executeStage;
