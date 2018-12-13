const { CodeFileType, StageContainerGroupType, StageContainerType, StageType } = require('./models');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const { MODEL_DB } = require('../config');
const { configResolver, configReader } = require('../ioHelpers').dethunked;

const findOneModel = (type, db, extraArgs = []) => ({
  type,
  args: {
    id: { type: GraphQLString },
    ...extraArgs.reduce((obj, arg) => ({ [arg]: { type: GraphQLString }, ...obj}), {})
  },
  resolve: async (_, {id, ...props}) => {
    if(id) {
      return configResolver(db, id)
    }
    const ids = await configReader(db);
    for(let i = 0; i < ids.length; i++) {
      const model = await configResolver(db, ids[i]);
      const keys = Object.keys(props);
      let matches = true;
      for(let j = 0; j < keys.length; j++) {
        if(model[keys[j]] !== props[keys[j]]) matches = false;
      }
      if(matches) return model;
    }
  },
});

const findManyModel = (type, db) => ({
    type: new GraphQLList(type),
    args: {
      containsId: { type: new GraphQLList(GraphQLString) },
      filter: { type: GraphQLString }
    },
    resolve: async (_, { containsId, filter }) => {
      const ids = containsId || await configReader(db);
      const models = await Promise.all(ids.map(id => configResolver(db, id)));
      if(filter) {
        const parsed = JSON.parse(filter);
        return models.filter(model => {
          const keys = Object.keys(parsed);
          for(let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if(model[key] !== parsed[key]) return false;
          }
          return true;
        });
      }
      return models;
    }
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    stage: findOneModel(StageType, MODEL_DB.STAGES),
    stages: findManyModel(StageType, MODEL_DB.STAGES),
    stageContainerGroup: findOneModel(StageContainerGroupType, MODEL_DB.STAGE_CONTAINER_GROUPS, ['title']),
    stageContainerGroups: findManyModel(StageContainerGroupType, MODEL_DB.STAGE_CONTAINER_GROUPS),
    stageContainer: findOneModel(StageContainerType, MODEL_DB.STAGE_CONTAINERS),
    stageContainers: findManyModel(StageContainerType, MODEL_DB.STAGE_CONTAINERS),
    codeFile: findOneModel(CodeFileType, MODEL_DB.CODE_FILES),
    codeFiles: findManyModel(CodeFileType, MODEL_DB.CODE_FILES),
  }
});

module.exports = QueryType;
