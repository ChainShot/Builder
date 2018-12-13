const { SolutionType } = require('../models');
const modifySolution = require('./solution/modify');
const txWrapper = require('./txWrapper');
const {
  GraphQLString,
} = require('graphql');

const solutionMutationArgs = {
  id: { type: GraphQLString },
  codeFileId: { type: GraphQLString },
  stageId: { type: GraphQLString },
  code: { type: GraphQLString },
}

module.exports = {
  modifySolution: {
    type: SolutionType,
    args: solutionMutationArgs,
    resolve: (_, props) => txWrapper(modifySolution)(props),
  }
}
