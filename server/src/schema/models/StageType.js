const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const { fileResolver, dbResolver } = require('../../utils/ioHelpers');
const { MODEL_DB } = require('../../config');
const findStageFilePath = require('../../projectHelpers/findStageFilePath');

const StageType = new GraphQLObjectType({
  name: 'Stage',
  fields: () => ({
    id: { type: GraphQLString },
    containerId: { type: GraphQLString },
    title: { type: GraphQLString },
    codeFiles: {
      type: new GraphQLList(require('./CodeFileType')),
      resolve: function({ codeFileIds }) {
        const ids = (codeFileIds || []);
        return Promise.all(ids.map(id => dbResolver(MODEL_DB.CODE_FILES, id)));
      }
    },
    details: {
      type: GraphQLString,
      resolve: async (props) => fileResolver(await findStageFilePath(props, 'details.md'))
    },
    task: {
      type: GraphQLString,
      resolve: async (props) => fileResolver(await findStageFilePath(props, 'task.md'))
    },
    abiValidations: {
      type: GraphQLString,
      resolve: async (props) => fileResolver(await findStageFilePath(props, 'validations.json'))
    }
  })
});

module.exports = StageType;
