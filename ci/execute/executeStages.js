const { EXECUTION_RESULTS } = require('../config');
const executeStage = require("./executeStage");

async function executeStages(stages) {
  return Promise.all(stages.map(async (stage, i) => {
    try {
      const { data } = await executeStage(stage);
      if(!data.completed) {
        console.log(data);
      }
      return data.completed ? EXECUTION_RESULTS.SUCCESS : EXECUTION_RESULTS.FAILED;
    }
    catch(ex) {
      console.log(ex.message);
      return EXECUTION_RESULTS.FAILED;
    }
  }));
}

module.exports = executeStages;
