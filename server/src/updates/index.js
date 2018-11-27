const { DB_DIR, PROJECTS_DIR } = require('../config');
const watch = require('node-watch');
const dbUpdate = require('./dbUpdate');
const projectUpdate = require('./projectUpdate');

const setup = (io) => {
  watch(DB_DIR, { recursive: true }, (...args) => {
    const response = dbUpdate(...args);
    // io.sockets.emit('update', { response });
  });

  watch(PROJECTS_DIR, { recursive: true }, async (...args) => {
    const model = await projectUpdate(...args);
    io.sockets.emit('update', model);
  });
}

module.exports = setup;
