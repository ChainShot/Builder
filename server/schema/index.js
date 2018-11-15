const CodeFileType = require('./CodeFileType');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const { dbResolver, dbReader } = require('./utils');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    codeFile: {
      type: CodeFileType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: function (_, {id}) {
        return dbResolver('code_files', id)
      }
    },
    codeFiles: {
      type: new GraphQLList(CodeFileType),
      args: {
        ids: { type: new GraphQLList(GraphQLString) }
      },
      resolve: function() {
        return dbReader('code_files').then(ids => {
          return Promise.all(ids.map(id => dbResolver('code_files', id)));
        });
      }
    }
  }
});

const schema = new GraphQLSchema({query: QueryType});

module.exports = schema;
