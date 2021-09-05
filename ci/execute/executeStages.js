const { EXECUTION_RESULTS } = require('../config');
const executeStage = require("./executeStage");

async function timeout(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds);
  });
}

async function executeStages(stages) {
  return Promise.all(stages.map(async (stage, i) => {
    const { language, languageVersion } = stage;

    await timeout(i * 500);

    try {
      const { data: { result: { completed }} } = await executeStage(stage);
      return completed ? EXECUTION_RESULTS.SUCCESS : EXECUTION_RESULTS.FAILED;
    }
    catch(ex) {
      console.log(ex.message);
      return EXECUTION_RESULTS.FAILED;
    }
  }));
}

module.exports = executeStages;
