const express = require('express');
const app = express();
const { PORT } = require('./config');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');
const http = require('http');
const io = require('socket.io');
const path = require('path');
const watcher = require('./watcher/setup');
const contentStartup = require('./contentStartup');
// message detected by the CLI for a successful start
const SERVER_UP = `Builder server @ ${PORT}!`;

function sendMessage(msg) {
  // process.send not defined outside of child processes
  // this is used for the CI script
  if(process.send) {
    process.send(msg);
  }
}

contentStartup(process.env.CONTENT_INIT).then(() => {
  app.use(express.json({limit: '50mb'}));
  app.use(cors({}));

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));

  const server = http.createServer(app);

  // watch for file updates and broadcast to listening clients
  if(!process.env.QUERY_ONLY) {
    watcher(io(server, {transports: ['websocket', 'polling', 'flashsocket']}));
  }

  // the CLI serves the production client from this server
  if(process.env.CLI) {
    app.use('/', express.static(path.join(__dirname, '../../client/build')));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../../client/build/index.html'));
    });
  }

  server.listen(PORT, () => {
    console.log(SERVER_UP);
    sendMessage("started");
  });
});
