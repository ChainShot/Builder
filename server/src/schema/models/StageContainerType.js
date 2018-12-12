const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const findStageContainerFilePath = require('../../projectHelpers/findStageContainerFilePath');
const {fileResolver, configReader, configResolver} = require('../../utils/ioHelpers');
const path = require('path');
const { MODEL_DB } = require('../../config');

const StageContainerType = new GraphQLObjectType({
  name: 'StageContainer',
  fields: () => ({
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    description: { type: GraphQLString },
    title: { type: GraphQLString },
    stageContainerGroupId: { type: GraphQLString },
    stageContainerGroup: {
      type: require('./StageContainerGroupType'),
      resolve: async (props) => configResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, props.stageContainerGroupId),
    },
    version: { type: GraphQLString },
    stages: {
      type: new GraphQLList(require('./StageType')),
      resolve: async (props) => {
        const ids = await configReader(MODEL_DB.STAGES);
        const models = await Promise.all(ids.map(id => configResolver(MODEL_DB.STAGES, id)));
        return models.filter(x => x.containerId === props.id);
      }
    },
    intro: {
      type: GraphQLString,
      resolve: async (props) => fileResolver(path.join(await findStageContainerFilePath(props), 'intro.md'))
    },
  })
});

module.exports = StageContainerType;
