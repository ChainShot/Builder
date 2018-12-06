const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const { MODEL_DB } = require('../../config');
const { configReader, configResolver } = require('../../utils/ioHelpers');

const StageContainerGroupType = new GraphQLObjectType({
  name: 'StageContainerGroup',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    containerType: { type: GraphQLString },
    preface: { type: GraphQLString },
    productionReady: { type: GraphQLBoolean },
    stageContainers: {
      type: new GraphQLList(require('./StageContainerType')),
      resolve: async ({ id }) => {
        const ids = await configReader(MODEL_DB.STAGE_CONTAINERS);
        const models = await Promise.all(ids.map(id => configResolver(MODEL_DB.STAGE_CONTAINERS, id)));
        return models.filter(x => x.stageContainerGroupId === id);
      }
    },
  })
});

module.exports = StageContainerGroupType;
