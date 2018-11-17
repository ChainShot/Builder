const express = require('express')
const app = express();
const { PORT } = require('./config');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');
const {graphql} = require('graphql');

app.use(express.json());
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, () => console.log(`Buidler server @ ${PORT}!`))
