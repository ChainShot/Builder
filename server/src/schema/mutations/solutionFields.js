const { findSolutionPath } = require('../../projectHelpers');
const { SolutionType } = require('../models');
const {
  configWriter,
  fileWriter,
  configResolver,
  fileRemove,
  configRemove,
} = require('../../utils/ioHelpers');
const { LOOKUP_KEY, MODEL_DB } = require('../../config');
const fs = require('fs-extra');
const {
  GraphQLString,
} = require('graphql');

const solutionProjectPropNames = {
  code: true
}

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
    async resolve (_, props) {
      const solution = await configResolver(MODEL_DB.SOLUTIONS, props.id);
      const merged = { ...solution, ...props };

      const newPath = await findSolutionPath(merged);
      const previousPath = await findSolutionPath(solution);

      if(newPath !== previousPath) {
        await fs.rename(previousPath, newPath);
      }

      const keys = Object.keys(props);
      for(let i = 0; i < keys.length; i++) {
        const key = keys[i];
        console.log(key);
        if(solutionProjectPropNames[key]) {
          await fileWriter(newPath, merged[key]);
          merged[key] = LOOKUP_KEY;
        }
      }

      return configWriter(MODEL_DB.SOLUTIONS, merged);
    }
  }
}
