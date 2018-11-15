const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const { fileResolver, dbResolver } = require('./utils');

const CodeFileType = new GraphQLObjectType({
  name: 'CodeFile',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: ({ _id }) => _id
    },
    name: { type: GraphQLString },
    executable: { type: GraphQLBoolean },
    initialCode: {
      type: GraphQLString,
      resolve: ({ initial_code }) => fileResolver(initial_code)
    },
    codeStages: {
      type: new GraphQLList(require('./StageType')),
      resolve: function({ code_stage_ids }) {
        const ids = (code_stage_ids || []);
        return Promise.all(ids.map(id => dbResolver('stages', id)));
      }
    }
  })
});

module.exports = CodeFileType;
