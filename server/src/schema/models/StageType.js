const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require('graphql');
const { fileResolver, configResolver, configDocumentReader } = require('../../ioHelpers').dethunked;
const { MODEL_DB } = require('../../config');
const path = require('path');
const findStageFilePath = require('../../projectHelpers/findStageFilePath');

const StageType = new GraphQLObjectType({
  name: 'Stage',
  fields: () => ({
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    containerId: { type: GraphQLString },
    position: { type: GraphQLInt },
    title: { type: GraphQLString },
    language: { type: GraphQLString },
    testFramework: { type: GraphQLString },
    languageVersion: { type: GraphQLString },
    projectSkeletons: { type: GraphQLList(require('./ProjectSkeletonType')) },
    codeFileIds: { type: GraphQLList(GraphQLString) },
    solutions: {
      type: new GraphQLList(require('./SolutionType')),
      resolve: async (props) => {
        const models = await configDocumentReader(MODEL_DB.SOLUTIONS);
        return models.filter(x => x.stageId === props.id);
      }
    },
    codeFiles: {
      type: new GraphQLList(require('./CodeFileType')),
      resolve: function({ codeFileIds }) {
        const ids = (codeFileIds || []);
        return Promise.all(ids.map(id => configResolver(MODEL_DB.CODE_FILES, id)));
      }
    },
    completionMessage: {
      type: GraphQLString,
      resolve: async (props) => fileResolver(path.join(await findStageFilePath(props), 'completionMessage.md'))
    },
    details: {
      type: GraphQLString,
      resolve: async (props) => fileResolver(path.join(await findStageFilePath(props), 'details.md'))
    },
    task: {
      type: GraphQLString,
      resolve: async (props) => fileResolver(path.join(await findStageFilePath(props), 'task.md'))
    },
    abiValidations: {
      type: GraphQLString,
      resolve: async (props) => fileResolver(path.join(await findStageFilePath(props), 'validations.json'))
    }
  })
});

module.exports = StageType;
