const { BadgeType } = require('../models');
const txWrapper = require('./txWrapper');
const destroyBadgeType = require('./badgeType/destroy');
const createBadgeType = require('./badgeType/create');
const modifyBadgeType = require('./badgeType/modify');
const {
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const badgeTypeMutationArgs = {
  id: { type: GraphQLString },
  name: { type: GraphQLString },
  description: { type: GraphQLString },
  badgeLimit: { type: GraphQLInt },
  thumbnailUrl: { type: GraphQLString },
}

const createMutationArgs = {
  ...badgeTypeMutationArgs,
  stageContainerGroupId: { type: GraphQLString },
}

module.exports = {
  destroyBadgeType: {
    type: BadgeType,
    args: {
      id: { type: GraphQLString },
    },
    resolve: (_, { id }) => txWrapper(destroyBadgeType)(id),
  },
  createBadgeType: {
    type: BadgeType,
    args: createMutationArgs,
    resolve: (_, props) => txWrapper(createBadgeType)(props),
  },
  modifyBadgeType: {
    type: BadgeType,
    args: badgeTypeMutationArgs,
    resolve: (_, props) => txWrapper(modifyBadgeType)(props),
  }
}
