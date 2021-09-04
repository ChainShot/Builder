const childProcess = require("child_process");
const path = require("path");
const serverPath = path.join(__dirname, "..", "server");

function startServer() {
  return new Promise((resolve, reject) => {
    const npmChild = childProcess.exec("npm i", { cwd: serverPath });
    npmChild.on("exit", () => {
      const child = childProcess.fork('src/index', [], {
        CONTENT_PATH: process.env.contentPath,
        CONTENT_REPO_NAME: process.env.contentRepoName,
        cwd: serverPath,
        detached: true,
        silent: false,
        env: { QUERY_ONLY: true }
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
