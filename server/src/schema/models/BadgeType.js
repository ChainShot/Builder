const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const BadgeType = new GraphQLObjectType({
  name: 'BadgeType',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    badgeLimit: { type: GraphQLInt },
    description: { type: GraphQLString },
    thumbnailUrl: { type: GraphQLString },
  })
});

module.exports = BadgeType;
