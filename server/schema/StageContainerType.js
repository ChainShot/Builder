const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const stageContainerLookup = require('./lookups/stageContainerLookup');
const {fileResolver, dbReader, dbResolver} = require('./utils');
const { MODEL_DB } = require('../config');

const StageContainerType = new GraphQLObjectType({
  name: 'StageContainer',
  fields: () => ({
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    description: { type: GraphQLString },
    title: { type: GraphQLString },
    stageContainerGroupId: { type: GraphQLString },
    version: { type: GraphQLString },
    stages: {
      type: new GraphQLList(require('./StageType')),
      resolve: async (props) => {
        const ids = await dbReader(MODEL_DB.STAGES);
        const models = await Promise.all(ids.map(id => dbResolver(MODEL_DB.STAGES, id)));
        return models.filter(x => x.containerId === props.id);
      }
    },
    intro: {
      type: GraphQLString,
      resolve: async (props) => fileResolver(await stageContainerLookup(props, 'intro.md'))
    },
  })
});

module.exports = StageContainerType;
