const childProcess = require("child_process");
const path = require("path");
const { BUILDER_PORT } = require('./config');
const serverPath = path.join(__dirname, "..", "server");

function startServer() {
  return new Promise((resolve, reject) => {
    const npmChild = childProcess.exec("npm i", { cwd: serverPath });
    npmChild.on("exit", () => {
      const child = childProcess.fork('src/index', [], {
        cwd: serverPath,
        detached: true,
        silent: false,
        env: {
          CONTENT_PATH: process.env.CONTENT_PATH,
          CONTENT_REPO_NAME: process.env.CONTENT_REPO_NAME,
          QUERY_ONLY: true,
          PORT: BUILDER_PORT
        }
      });
      child.on('message', (msg) => {
        if(msg === "started") {
          resolve(child);
        }
      });
      child.on('error', (ex) => {
        console.log(ex);
      });
    });
  });
}

module.exports = startServer;
