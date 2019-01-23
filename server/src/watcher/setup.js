const { CONTENT_DIR } = require('../config');
const watch = require('node-watch');
const configUpdate = require('./configUpdate');
const projectUpdate = require('./projectUpdate');
const slash = require('slash');
const fs = require('fs-extra');

function getClients(io) {
  return new Promise((resolve, reject) => {
    io.clients((err, clients) => {
      if(err) return reject(err);
      resolve(clients);
    });
  });
}

const setup = (io) => {
  watch(CONTENT_DIR, { recursive: true }, async () => {
    const clients = await getClients(io);
    if(clients.length > 0) {
      io.sockets.emit('update');
    }
  });
}

module.exports = setup;
