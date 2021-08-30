const executeStages = require("./executeStages");
const { EXECUTION_RESULTS } = require('../config');

function executeGroups(groups) {
  const stageContainers = groups.reduce((arr, group) => {
    const containers = group.stageContainers.map((x) => ({ ...x, stageContainerGroup: group }))
    return arr.concat(containers);
  }, []);

  const promises = new Array(stageContainers.length).fill(0).map(async (_, j) => {
    const stageContainer = stageContainers[j];

    const { version, stages, stageContainerGroup } = stageContainer;
    const { title } = stageContainerGroup;

    console.log(`Running ${title} ${version}...`);
    const results = await executeStages(stages);
    const executedResults = results.filter(x => x !== EXECUTION_RESULTS.NONE);
    if(executedResults.length === 0) {
      return;
    }

    console.log(`${title} ${version} results:`);
    executedResults.forEach((result, i) => {
      if(result === EXECUTION_RESULTS.SUCCESS) {
        console.log(`✔️ ${stageContainer.stages[i].title} passed!`)
      }
      else {
        console.log(`✘ ${stageContainer.stages[i].title} failed!`)
      }
    });
  });

  return Promise.all(promises);
}

module.exports = executeGroups;
