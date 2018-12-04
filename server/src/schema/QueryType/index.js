const CodeFileType = require('../models/CodeFileType');
const StageType = require('../models/StageType');
const StageContainerGroupType = require('../models/StageContainerGroupType');
const StageContainerType = require('../models/StageContainerType');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const { MODEL_DB } = require('../../config');
const { dbResolver, dbReader } = require('../../utils/ioHelpers');

const findOneModel = (type, db, extraArgs = []) => ({
  type,
  args: {
    id: { type: GraphQLString },
    ...extraArgs.reduce((obj, arg) => ({ [arg]: { type: GraphQLString }, ...obj}), {})
  },
  resolve: async (_, {id, ...props}) => {
    if(id) {
      return dbResolver(db, id)
    }
    const ids = await dbReader(db);
    for(let i = 0; i < ids.length; i++) {
      const model = await dbResolver(db, ids[i]);
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
      const ids = containsId || await dbReader(db);
      const models = await Promise.all(ids.map(id => dbResolver(db, id)));
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
