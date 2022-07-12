const startServer = require('./startServer');
const getStageContainerGroups = require('./query/getStageContainerGroups');
const getStageContainerGroupIds = require('./query/getStageContainerGroupIds');
const executeGroups = require('./execute/executeGroups');

let serverProcess;

async function testAll() {
  serverProcess = await startServer();

  try {
    const groupIds = await getStageContainerGroupIds();
    const groups = await getStageContainerGroups(groupIds);
    await executeGroups(groups);
  }
  catch (ex) {
    console.log(ex);
    serverProcess.kill();
    process.exit(1);
  }

  serverProcess.kill();
}

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
  const cleanup = cleanUpServer.bind(null, eventType);
  process.on(eventType, (...args) => {
    if (eventType === "uncaughtException") {
      console.log(eventType, ...args);
    }
    cleanup(eventType === "exit");
  });
});

function cleanUpServer(success) {
  if (serverProcess) {
    serverProcess.kill();
  }
  process.exit(success ? 0 : 1);
}

testAll();
