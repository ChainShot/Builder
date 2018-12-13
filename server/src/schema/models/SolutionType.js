const {
  GraphQLString,
  GraphQLObjectType,
} = require('graphql');
const { fileResolver } = require('../../ioHelpers').dethunked;
const findSolutionPath = require('../../projectHelpers/findSolutionPath');

const SolutionType = new GraphQLObjectType({
  name: 'Solution',
  fields: () => ({
    id: { type: GraphQLString },
    stageId: { type: GraphQLString },
    codeFileId: { type: GraphQLString },
    code: {
      type: GraphQLString,
      resolve: async (solution) => {
        return fileResolver(await findSolutionPath(solution));
      }
    },
  })
});

module.exports = SolutionType;
