const { DB_DIR, PROJECTS_DIR } = require('../config');
const watch = require('node-watch');
const dbUpdate = require('./dbUpdate');
const projectUpdate = require('./projectUpdate');

const setup = (io) => {
  watch(DB_DIR, { recursive: true }, (...args) => {
    const response = dbUpdate(...args);
    io.sockets.emit('hi', { response });
  });

  watch(PROJECTS_DIR, { recursive: true }, (...args) => {
    const response = projectUpdate(...args);
    io.sockets.emit('hi', { response });
  });
}

module.exports = setup;
