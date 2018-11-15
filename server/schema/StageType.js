const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const { fileResolver, dbResolver } = require('./utils');

const StageType = new GraphQLObjectType({
  name: 'Stage',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: ({ _id }) => _id
    },
    title: { type: GraphQLString },
    codeFiles: {
      type: new GraphQLList(require('./CodeFileType')),
      resolve: function({ code_file_ids }) {
        const ids = (code_file_ids || []);
        return Promise.all(ids.map(id => dbResolver('code_files', id)));
      }
    },
    details: {
      type: GraphQLString,
      resolve: ({ details }) => fileResolver(details)
    }
  })
});

module.exports = StageType;
