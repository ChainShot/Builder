const { exec } = require('child_process');

function setupClient(cwd) {
  return new Promise((resolve, reject) => {
    const child = exec('npm i && npm run build', { cwd });
    child.on('exit', (code) => {
      if(code === 0) resolve();
      else reject('Failed to build client');
    });
  });
}

module.exports = setupClient;
