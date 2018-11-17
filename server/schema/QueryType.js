const CodeFileType = require('./CodeFileType');
const StageType = require('./StageType');
const StageContainerGroupType = require('./StageContainerGroupType');
const StageContainerType = require('./StageContainerType');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const { MODEL_DB } = require('../config');
const { dbResolver, dbReader } = require('./utils');

const findOneModel = (type, db) => ({
  type,
  args: {
    id: { type: GraphQLString }
  },
  resolve: (_, {id}) => dbResolver(db, id),
});

const findManyModel = (type, db) => ({
    type: new GraphQLList(type),
    args: {
      containsId: { type: new GraphQLList(GraphQLString) }
    },
    resolve: async (_, { containsId }) => {
      const ids = containsId || await dbReader(db);
      return Promise.all(ids.map(id => dbResolver(db, id)));
    }
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    stage: findOneModel(StageType, MODEL_DB.STAGES),
    stages: findManyModel(StageType, MODEL_DB.STAGES),
    stageContainerGroup: findOneModel(StageContainerGroupType, MODEL_DB.STAGE_CONTAINER_GROUPS),
    stageContainerGroups: findManyModel(StageContainerGroupType, MODEL_DB.STAGE_CONTAINER_GROUPS),
    stageContainer: findOneModel(StageContainerType, MODEL_DB.STAGE_CONTAINERS),
    stageContainers: findManyModel(StageContainerType, MODEL_DB.STAGE_CONTAINERS),
    codeFile: findOneModel(CodeFileType, MODEL_DB.CODE_FILES),
    codeFiles: findManyModel(CodeFileType, MODEL_DB.CODE_FILES),
  }
});

module.exports = QueryType;
