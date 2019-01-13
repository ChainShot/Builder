const { exec } = require('child_process');

function setupServer(cwd) {
  return new Promise((resolve, reject) => {
    const child = exec('npm i', { cwd });
    child.on('exit', (code) => {
      if(code === 0) resolve();
      else reject('Failed to build server');
    });
  });
}

module.exports = setupServer;
