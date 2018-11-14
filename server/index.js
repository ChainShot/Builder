const express = require('express')
const app = express()
const port = 3000
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');
const dbDir = '../content/db';
const projectsDir = '../content/projects';

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});


app.get('/', (req, res) => {
  var query = '{ hello }';

  graphql(schema, query).then(result => {

    res.send(result);

  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
