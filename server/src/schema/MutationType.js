const {
  codeFileFields,
  stageContainerFields,
  stageFields,
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
  }
})

module.exports = MutationType;
