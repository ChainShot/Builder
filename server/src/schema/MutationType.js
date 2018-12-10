const {
  codeFileFields,
  stageContainerFields,
  stageFields,
  solutionFields,
  stageContainerGroupFields
} = require('./mutations');
const { GraphQLObjectType } = require('graphql');

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...codeFileFields,
    ...stageContainerFields,
    ...stageFields,
    ...stageContainerGroupFields,
    ...solutionFields,
  }
})

module.exports = MutationType;
