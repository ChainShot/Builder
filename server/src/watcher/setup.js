const { CONTENT_DIR } = require('../config');
const watch = require('node-watch');
const fs = require('fs-extra');

const CONTENT_FOLDERS = ['projects', 'config'];

function getClients(io) {
  return new Promise((resolve, reject) => {
    io.clients((err, clients) => {
      if(err) return reject(err);
      resolve(clients);
    });
  });
}

function watchDir(dir) {
  watch(dir, { recursive: true }, async () => {
    const clients = await getClients(io);
    if(clients.length > 0) {
      io.sockets.emit('update');
    }
  });
}

const setup = (io) => {
  CONTENT_FOLDERS.forEach((folderName) => {
    const fullDir = path.join(CONTENT_DIR, folderName);
    watchDir(fullDir);
  });
}

module.exports = setup;
