const CodeFileType = require('./CodeFileType');
const StageType = require('./StageType');
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
    stage: {
      type: StageType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: function (_, {id}) {
        return dbResolver('stages', id)
      }
    },
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
        containsId: { type: new GraphQLList(GraphQLString) }
      },
      resolve: function(_, { containsId }) {
        const idsPromise = containsId ? Promise.resolve(containsId) : dbReader('code_files');
        return idsPromise.then(ids => {
          return Promise.all(ids.map(id => dbResolver('code_files', id)));
        });
      }
    }
  }
});

module.exports = QueryType;
