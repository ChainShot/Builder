const destroyStage = require('./stage/destroy');
const createStage = require('./stage/create');
const modifyStage = require('./stage/modify');
const txWrapper = require('./txWrapper');
const { StageType } = require('../models');
const {
  GraphQLList,
  GraphQLString,
} = require('graphql');

const stageArgs = {
  id: { type: GraphQLString },
  containerId: { type: GraphQLString },
  codeFileIds: { type: new GraphQLList(GraphQLString) },
  language: { type: GraphQLString },
  testFramework: { type: GraphQLString },
  languageVersion: { type: GraphQLString },
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
    resolve: (_, { id }) => txWrapper(destroyStage)(id),
  },
  createStage: {
    type: StageType,
    args: stageArgs,
    resolve: (_, props) => txWrapper(createStage)(props),
  },
  modifyStage: {
    type: StageType,
    args: stageArgs,
    resolve: (_, props) => txWrapper(modifyStage)(props),
  },
}
