const { DB_DIR, PROJECTS_DIR } = require('../config');
const watch = require('node-watch');
const dbUpdate = require('./dbUpdate');
const projectUpdate = require('./projectUpdate');

const setup = (io) => {
  watch(DB_DIR, { recursive: true }, (evt, name) => {
    const update = dbUpdate(evt, name);
    io.sockets.emit('update', update);
  });

  watch(PROJECTS_DIR, { recursive: true }, async (evt, name) => {
    try {
      const update = await projectUpdate(evt, name);
      io.sockets.emit('update', update);
    }
    catch(ex) {
      console.log(`Unable to lookup file association for '${name}'`, ex);
    }
  });
}

module.exports = setup;
