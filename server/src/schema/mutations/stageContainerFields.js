const { StageContainerType } = require('../models');
const destroyStageContainer = require('./stageContainer/destroy');
const createStageContainer = require('./stageContainer/create');
const modifyStageContainer = require('./stageContainer/modify');
const txWrapper = require('./txWrapper');
const {
  GraphQLString,
} = require('graphql');

const stageContainerArgs = {
  id: { type: GraphQLString },
  version: { type: GraphQLString },
  stageContainerGroupId: { type: GraphQLString },
  type: { type: GraphQLString },
  intro: { type: GraphQLString },
}

module.exports = {
  destroyStageContainer: {
    type: StageContainerType,
    args: {
      id: { type: GraphQLString },
    },
    resolve: (_, { id }) => txWrapper(destroyStageContainer)(id),
  },
  createStageContainer: {
    type: StageContainerType,
    args: stageContainerArgs,
    resolve: (_, { stageContainerGroupId }) => txWrapper(createStageContainer)(stageContainerGroupId),
  },
  modifyStageContainer: {
    type: StageContainerType,
    args: stageContainerArgs,
    resolve: (_, props) => txWrapper(modifyStageContainer)(props),
  },
}
