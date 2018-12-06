const { CONFIG_DIR, PROJECTS_DIR } = require('../config');
const watch = require('node-watch');
const configUpdate = require('./configUpdate');
const projectUpdate = require('./projectUpdate');
const slash = require('slash');

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
    // convert to forward slash here so we can use it with abandon
    const posixFileName = slash(name);

    // if these changes affect the project file paths, update them here
    await configSave(posixFileName);

    const clients = await getClients(io);
    if(clients.length > 0) {
      // broadcast changes if anyones listening
      const message = configMessage(posixFileName);
      io.sockets.emit('update', message);
    }
  });

  watch(PROJECTS_DIR, { recursive: true }, async (evt, name) => {
    // convert to forward slash here so we can use it with abandon
    const posixFileName = slash(name);

    // if these changes need to be saved to other files, handle it here
    await projectSave(posixFileName);

    const clients = await getClients(io);
    if(clients.length > 0) {
      // broadcast changes if anyones listening
      try {
        const message = await projectMessage(posixFileName);
        io.sockets.emit('update', message);
      }
      catch(ex) {
        console.log(`Unable to lookup file association for '${name}'`, ex);
      }
    }
  });
}

module.exports = setup;
