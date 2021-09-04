const startServer = require('./startServer');
const getStageContainerGroups = require('./query/getStageContainerGroups');
const getStageContainerGroupIds = require('./query/getStageContainerGroupIds');
const executeGroups = require('./execute/executeGroups');

const BATCH_AMOUNT = 1;
let serverProcess;

async function testAll() {
  serverProcess = await startServer();

  try {
    const groupIds = await getStageContainerGroupIds();

    for(let i = 0; i < groupIds.length; i+=BATCH_AMOUNT) {
      const groups = await getStageContainerGroups(groupIds.slice(i, i + BATCH_AMOUNT));

      await executeGroups(groups);
    }
  }
  catch(ex) {
    console.log(ex);
    serverProcess.kill();
    process.exit(1);
  }

  serverProcess.kill();
}

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
  const cleanup = cleanUpServer.bind(null, eventType);
  process.on(eventType, (...args) => {
    if(eventType === "uncaughtException") {
      console.log(eventType, ...args);
    }
    cleanup();
  });
});

function cleanUpServer() {
  if(serverProcess) {
    serverProcess.kill();
  }
  process.exit(1);
}

testAll();
