const executeStages = require("./executeStages");
const { EXECUTION_RESULTS, LANGUAGE_VERSIONS } = require('../config');

function sendProcessMessage(msg) {
  // process.send not defined outside of child processes
  // this is used for the Builder CLI
  if(process.send) {
    process.send(msg);
  }
}

async function executeGroups(groups) {
  const stageContainers = groups.reduce((arr, group) => {
    const containers = group.stageContainers.map((x) => ({ ...x, stageContainerGroup: group }))
    return arr.concat(containers);
  }, []);
  
  const promises = [];
  for(let i = 0; i < stageContainers.length; i++) {
    const stageContainer = stageContainers[i];

    const { version, stages, stageContainerGroup } = stageContainer;
    const { title } = stageContainerGroup;

    const isUnsupported = stages.some(({ language, languageVersion }) => {
      return (LANGUAGE_VERSIONS[language] || []).indexOf(languageVersion) < 0;
    });
    if(isUnsupported) {
      // skip this stage container if any stages are unsupported
      continue;
    }

    const promise = executeStages(stages);
    promise.then((results) => {
      console.log(`Results for ${title} ${version}...`);
      results.forEach((result, i) => {
        const stage = stageContainer.stages[i];
        if(result === EXECUTION_RESULTS.SUCCESS) {
          console.log(`✔️ ${stage.title} passed!`);
          sendProcessMessage({ type: "RESULT", data: {
            success: true,
            version: `${title} ${version}`,
            stage: stage.title
          }});
        }
        else if(result === EXECUTION_RESULTS.FAILED) {
          console.log(`✘ ${stage.title} failed!`);
          sendProcessMessage({ type: "RESULT", data: {
            success: false,
            version: `${title} ${version}`,
            stage: stage.title
          }});
        }
      });
    });
    promises.push(promise);
  }
  Promise.all(promises).then(() => process.exit(0));
}

module.exports = executeGroups;
