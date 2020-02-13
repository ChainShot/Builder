const { PROJECTS_DIR, CONFIG_DIR } = require('../config');
const watch = require('node-watch');
const fs = require('fs-extra');

const CONTENT_FOLDERS = [PROJECTS_DIR, CONFIG_DIR];

function getClients(io) {
  return new Promise((resolve, reject) => {
    io.clients((err, clients) => {
      if(err) return reject(err);
      resolve(clients);
    });
  });
}

const setup = (io) => {
  CONTENT_FOLDERS.forEach((dir) => {
    watch(dir, { recursive: true }, async () => {
      const clients = await getClients(io);
      if(clients.length > 0) {
        io.sockets.emit('update');
      }
    });
  });
}

module.exports = setup;
