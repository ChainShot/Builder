const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
} = require('graphql');
const { fileResolver } = require('./utils');

const CodeFileType = new GraphQLObjectType({
  name: 'CodeFile',
  fields: {
    id: {
      type: GraphQLString,
      resolve: ({ _id }) => _id
    },
    name: { type: GraphQLString },
    executable: { type: GraphQLBoolean },
    initialCode: {
      type: GraphQLString,
      resolve: ({ initial_code }) => fileResolver(initial_code)
    }
  }
});

module.exports = CodeFileType;
