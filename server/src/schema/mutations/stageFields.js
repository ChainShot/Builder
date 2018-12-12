const destroyStage = require('./stage/destroy');
const createStage = require('./stage/create');
const modifyStage = require('./stage/modify');
const reportWrapper = require('./reportWrapper');
const { StageType } = require('../models');
const {
  GraphQLList,
  GraphQLString,
} = require('graphql');

const stageArgs = {
  id: { type: GraphQLString },
  containerId: { type: GraphQLString },
  codeFileIds: { type: new GraphQLList(GraphQLString) },
  title: { type: GraphQLString },
  abiValidations: { type: GraphQLString },
  task: { type: GraphQLString },
  details: { type: GraphQLString },
}

module.exports = {
  destroyStage: {
    type: StageType,
    args: {
      id: { type: GraphQLString },
    },
    resolve: (_, { id }) => reportWrapper(destroyStage)(id),
  },
  createStage: {
    type: StageType,
    args: stageArgs,
    resolve: (_, props) => reportWrapper(createStage)(props),
  },
  modifyStage: {
    type: StageType,
    args: stageArgs,
    resolve: (_, props) => reportWrapper(modifyStage)(props),
  },
}
