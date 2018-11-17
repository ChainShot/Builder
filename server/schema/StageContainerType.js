const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const stageContainerLookup = require('./lookups/stageContainerLookup');
const {fileResolver} = require('./utils');

const StageContainerType = new GraphQLObjectType({
  name: 'StageContainer',
  fields: () => ({
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    description: { type: GraphQLString },
    title: { type: GraphQLString },
    stageContainerGroupId: { type: GraphQLString },
    version: { type: GraphQLString },
    intro: {
      type: GraphQLString,
      resolve: async (props) => fileResolver(await stageContainerLookup(props, 'intro.md'))
    },
  })
});

module.exports = StageContainerType;
