const { StageContainerGroupType } = require('../models');
const destroyStageContainerGroup = require('./stageContainerGroup/destroy');
const createStageContainerGroup = require('./stageContainerGroup/create');
const modifyStageContainerGroup = require('./stageContainerGroup/modify');
const reportWrapper = require('./reportWrapper');
const {
  GraphQLString,
} = require('graphql');

const stageContainerGroupArgs = {
  id: { type: GraphQLString },
  title: { type: GraphQLString },
  description: { type: GraphQLString },
  containerType: { type: GraphQLString },
}

module.exports = {
  destroyStageContainerGroup: {
    type: StageContainerGroupType,
    args: {
      id: { type: GraphQLString },
    },
    resolve: (_, { id }) => reportWrapper(destroyStageContainerGroup)(id),
  },
  createStageContainerGroup: {
    type: StageContainerGroupType,
    args: stageContainerGroupArgs,
    resolve: (_, props) => reportWrapper(createStageContainerGroup)(props),
  },
  modifyStageContainerGroup: {
    type: StageContainerGroupType,
    args: stageContainerGroupArgs,
    resolve: (_, props) => reportWrapper(modifyStageContainerGroup)(props),
  },
}
