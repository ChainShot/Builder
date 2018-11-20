const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const { fileResolver, dbResolver } = require('./utils');
const { MODEL_DB } = require('../config');
const stageLookup = require('./lookups/stageLookup');

const StageType = new GraphQLObjectType({
  name: 'Stage',
  fields: () => ({
    id: { type: GraphQLString },
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
      resolve: async (props) => fileResolver(await stageLookup(props, 'details.md'))
    },
    task: {
      type: GraphQLString,
      resolve: async (props) => fileResolver(await stageLookup(props, 'task.md'))
    },
    abiValidations: {
      type: GraphQLString,
      resolve: async (props) => fileResolver(await stageLookup(props, 'validations.json'))
    }
  })
});

module.exports = StageType;
