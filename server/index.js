const express = require('express')
const app = express();
const { PORT } = require('./config');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.get('/', (req, res) => {
  var query = '{ hello }';

  graphql(schema, query).then(result => {

    res.send(result);

  });
})

app.listen(PORT, () => console.log(`Buidler server @ ${PORT}!`))
