const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');
const { configDocumentReader } = require('../../ioHelpers').dethunked;
const { MODEL_DB } = require('../../config');

const BadgeType = new GraphQLObjectType({
  name: 'BadgeType',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    badgeLimit: { type: GraphQLInt },
    description: { type: GraphQLString },
    thumbnailUrl: { type: GraphQLString },
    stageContainer: {
      type: require('./StageContainerType'),
      resolve: async (props) => {
        const groups = await configDocumentReader(MODEL_DB.STAGE_CONTAINER_GROUPS);
        const group = groups.find(x => (x.badgeTypeIds || []).indexOf(props.id) >= 0);
        const containers = await configDocumentReader(MODEL_DB.STAGE_CONTAINERS);
        return containers.find(x => x.stageContainerGroupId === group.id);
      }
    },
  })
});

module.exports = BadgeType;
