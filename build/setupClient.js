const { spawn } = require('child_process');

function setupClient(cwd) {
  return new Promise((resolve, reject) => {
    const installChild = spawn('npm', ['i'], { cwd, stdio: 'inherit' });
    installChild.on('exit', (code) => {
      const env = {
        ...process.env,
        NODE_PATH: 'src/',
      }
      const runChild = spawn('npm', ['run', 'build'], { env, cwd, stdio: 'inherit' });
      if(code !== 0) {
        reject('Failed to install client dependencies!');
        return;
      }
      runChild.on('exit', (code) => {
        if(code === 0) resolve();
        else reject('Failed to build client!');
      });
    });
  });
}

module.exports = setupClient;
