const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const { MODEL_DB } = require('../../config');
const { dbReader, dbResolver } = require('../../utils/ioHelpers');

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
        const ids = await dbReader(MODEL_DB.STAGE_CONTAINERS);
        const models = await Promise.all(ids.map(id => dbResolver(MODEL_DB.STAGE_CONTAINERS, id)));
        return models.filter(x => x.stageContainerGroupId === id);
      }
    },
  })
});

module.exports = StageContainerGroupType;
