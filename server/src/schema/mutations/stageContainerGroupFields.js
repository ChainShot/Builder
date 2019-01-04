const { StageContainerGroupType } = require('../models');
const destroyStageContainerGroup = require('./stageContainerGroup/destroy');
const createStageContainerGroup = require('./stageContainerGroup/create');
const modifyStageContainerGroup = require('./stageContainerGroup/modify');
const txWrapper = require('./txWrapper');
const {
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');

const stageContainerGroupArgs = {
  id: { type: GraphQLString },
  title: { type: GraphQLString },
  description: { type: GraphQLString },
  containerType: { type: GraphQLString },
  productionReady: { type: GraphQLBoolean },
}

module.exports = {
  destroyStageContainerGroup: {
    type: StageContainerGroupType,
    args: {
      id: { type: GraphQLString },
    },
    resolve: (_, { id }) => txWrapper(destroyStageContainerGroup)(id),
  },
  createStageContainerGroup: {
    type: StageContainerGroupType,
    args: stageContainerGroupArgs,
    resolve: (_, props) => txWrapper(createStageContainerGroup)(props),
  },
  modifyStageContainerGroup: {
    type: StageContainerGroupType,
    args: stageContainerGroupArgs,
    resolve: (_, props) => txWrapper(modifyStageContainerGroup)(props),
  },
}
