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
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    executable: { type: GraphQLBoolean },
    executablePath: { type: GraphQLString },
    fileLocation: { type: GraphQLString },
    hasProgress: { type: GraphQLBoolean },
    mode: { type: GraphQLString },
    readOnly: { type: GraphQLBoolean },
    testFixture: { type: GraphQLBoolean },
    visible: { type: GraphQLBoolean },
    codeStageIds: { type: new GraphQLList(GraphQLString) },
    codeStages: {
      type: new GraphQLList(require('./StageType')),
      resolve: function({ codeStageIds }) {
        const ids = (codeStageIds || []);
        return Promise.all(ids.map(id => dbResolver('stages', id)));
      }
    },
    initialCode: {
      type: GraphQLString,
      resolve: async (cf) => {
        const paths = await codeFileLookup(cf);
        return fileResolver(paths[0]);
      }
    },
  })
});

module.exports = CodeFileType;
