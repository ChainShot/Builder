const startServer = require('./startServer');
const getStageContainerGroups = require('./query/getStageContainerGroups');
const getStageContainerGroupIds = require('./query/getStageContainerGroupIds');
const executeGroups = require('./execute/executeGroups');

const BATCH_AMOUNT = 1;
let controller;

async function testAll() {
  controller = await startServer();

  try {
    const groupIds = await getStageContainerGroupIds();

    for(let i = 0; i < groupIds.length; i+=BATCH_AMOUNT) {
      const groups = await getStageContainerGroups(groupIds.slice(i, i + BATCH_AMOUNT));

      await executeGroups(groups);
    }
  }
  catch(ex) {
    console.log(ex);
    controller.abort();
    process.exit(1);
  }

  controller.abort();
}

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
  process.on(eventType, cleanUpServer.bind(null, eventType));
});

function cleanUpServer() {
  if(controller) {
    controller.abort();
  }
  process.exit(1);
}

testAll();
