const childProcess = require("child_process");
const path = require("path");
const serverPath = path.join(__dirname, "..", "server");

function startServer() {
  return new Promise((resolve, reject) => {
    // todo: npm i beforehand?
    const controller = new AbortController();
    const { signal } = controller;
    const child = childProcess.fork('src/index', [], {
      cwd: serverPath,
      signal,
      detached: true,
      silent: false,
      env: { QUERY_ONLY: true }
    });
    child.on('message', (msg) => {
      if(msg === "started") {
        resolve(controller);
      }
    });
    child.on('error', (ex) => {
      console.log(ex)
    });
  });
}

module.exports = startServer;
