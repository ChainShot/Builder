const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const { fileResolver, dbResolver } = require('./utils');
const codeFileLookup = require('./lookups/codeFileLookup');

const CodeFileType = new GraphQLObjectType({
  name: 'CodeFile',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: ({ _id }) => _id
    },
    name: { type: GraphQLString },
    executable: { type: GraphQLBoolean },
    executablePath: { type: GraphQLString },
    codeStageIds: { type: new GraphQLList(GraphQLString) },
    initialCode: {
      type: GraphQLString,
      resolve: async (cf) => {
        const paths = await codeFileLookup(cf);
        return fileResolver(paths[0]);
      }
    },
    codeStages: {
      type: new GraphQLList(require('./StageType')),
      resolve: function({ codeStageIds }) {
        const ids = (codeStageIds || []);
        return Promise.all(ids.map(id => dbResolver('stages', id)));
      }
    }
  })
});

module.exports = CodeFileType;
