const { CONFIG_DIR, PROJECTS_DIR } = require('../config');
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
  watch(CONFIG_DIR, { recursive: true }, async (evt, name) => {
    const exists = await fs.exists(name);
    // can't look up data for a file that no longer exists
    if(!exists) return;
    // convert to forward slash here so we can use it with abandon
    const posixFileName = slash(name);

    const clients = await getClients(io);
    if(clients.length > 0) {
      // broadcast changes if anyones listening
      try {
        const message = await configUpdate(posixFileName);
        io.sockets.emit('update', message);
      }
      catch(ex) {
        console.log(`Unable to lookup config update for '${posixFileName}'`, ex);
      }
    }
  });

  watch(PROJECTS_DIR, { recursive: true }, async (evt, name) => {
    // convert to forward slash here so we can use it with abandon
    const posixFileName = slash(name);

    const clients = await getClients(io);
    if(clients.length > 0) {
      // broadcast changes if anyones listening
      try {
        const message = await projectUpdate(posixFileName);
        io.sockets.emit('update', message);
      }
      catch(ex) {
        console.log(`Unable to lookup file association for '${name}'`, ex);
      }
    }
  });
}

module.exports = setup;
