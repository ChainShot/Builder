const fields = require('./mutations');
const { GraphQLObjectType } = require('graphql');

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields
})

module.exports = MutationType;
