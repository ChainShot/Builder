const axios = require('axios');
const { RUN_URL } = require('../config');

const queue = [];
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
  const params = {
    files,
    language,
    languageVersion,
    forkBlockNumber
  }
  return new Promise((resolve) => {
    queue.push({ 
      params,
      callback: (response) => {
        resolve(response);
      }
    })
  });
}

const batchSize = 20;
const queueWait = 100;
function executeQueue() {
  let promises = [];
  for(let i = 0; i < batchSize; i++) {
    if(queue.length === 0) continue;
    const { params, callback } = queue.pop();
    const promise = axios.post(RUN_URL, params);
    promise.then(callback);
    promises.push(promise);
  }
  Promise.all(promises).then(() => setTimeout(executeQueue, queueWait));
}
setTimeout(executeQueue, queueWait);

module.exports = executeStage;
