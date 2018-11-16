const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const StageContainerGroupType = new GraphQLObjectType({
  name: 'StageContainerGroup',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    containerType: { type: GraphQLString },
    preface: { type: GraphQLString },
    productionReady: { type: GraphQLBoolean },
  })
});

module.exports = StageContainerGroupType;
