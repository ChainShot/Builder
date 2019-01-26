const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require('graphql');
const { MODEL_DB } = require('../../config');
const { configDocumentReader, configResolver } = require('../../ioHelpers').dethunked;

const StageContainerGroupType = new GraphQLObjectType({
  name: 'StageContainerGroup',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    containerType: { type: GraphQLString },
    productionReady: { type: GraphQLBoolean },
    thumbnailUrl: { type: GraphQLString },
    estimatedTime: { type: GraphQLInt },
    badgeTypes: {
      type: new GraphQLList(require('./BadgeType')),
      resolve: async ({ badgeTypeIds }) => {
        const ids = (badgeTypeIds || []);
        return Promise.all(ids.map(id => configResolver(MODEL_DB.BADGE_TYPES, id)));
      }
    },
    stageContainers: {
      type: new GraphQLList(require('./StageContainerType')),
      resolve: async ({ id }) => {
        const models = await configDocumentReader(MODEL_DB.STAGE_CONTAINERS);
        return models.filter(x => x.stageContainerGroupId === id);
      }
    },
  })
});

module.exports = StageContainerGroupType;
