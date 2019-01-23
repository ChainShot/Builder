const { CodeFileType } = require('../models');
const txWrapper = require('./txWrapper');
const destroyCodeFile = require('./codeFile/destroy');
const createCodeFile = require('./codeFile/create');
const modifyCodeFile = require('./codeFile/modify');
const {
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');

const codeFileMutationArgs = {
  id: { type: GraphQLString },
  name: { type: GraphQLString },
  executable: { type: GraphQLBoolean },
  executablePath: { type: GraphQLString },
  fileLocation: { type: GraphQLString },
  hasProgress: { type: GraphQLBoolean },
  mode: { type: GraphQLString },
  readOnly: { type: GraphQLBoolean },
  testFixture: { type: GraphQLBoolean },
  visible: { type: GraphQLBoolean },
  stageContainerId: { type: GraphQLString },
  codeStageIds: { type: new GraphQLList(GraphQLString) },
  initialCode: { type: GraphQLString },
}

module.exports = {
  deleteCodeFile: {
    type: CodeFileType,
    args: {
      id: { type: GraphQLString },
    },
    resolve: (_, { id }) => txWrapper(destroyCodeFile)(id),
  },
  createCodeFile: {
    type: CodeFileType,
    args: codeFileMutationArgs,
    resolve: (_, props) => txWrapper(createCodeFile)(props),
  },
  modifyCodeFile: {
    type: CodeFileType,
    args: codeFileMutationArgs,
    resolve: (_, props) => txWrapper(modifyCodeFile)(props),
  }
}
