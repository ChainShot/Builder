const express = require('express')
const app = express();
const { PORT } = require('./config');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');
const {graphql} = require('graphql');
const http = require('http');
const io = require('socket.io');
const updates = require('./updates');

app.use(express.json());
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const server = http.createServer(app);

updates(io(server));

server.listen(PORT, () => console.log(`Builder server @ ${PORT}!`))
