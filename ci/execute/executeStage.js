const axios = require('axios');
const { RUN_URL } = require('../config');

async function executeStage(stage) {
  const files = stage.codeFiles
    .filter(x => x.executable)
    .map(({ id, initialCode, executablePath, hasProgress }) => {
      if(hasProgress) {
        const solution = stage.solutions.find(x => x.codeFileId === id);
        return { contents: solution.code, path: executablePath }
      }
      return { contents: initialCode, path: executablePath }
    });

  const { id, languageVersion, language, testFramework, forkBlockNumber } = stage;

  return axios.post(RUN_URL, {
    stageId: stage.id,
    files,
    languageVersion,
    language,
    testFramework,
    forkBlockNumber,
    noCache: true
  });
}

module.exports = executeStage;
