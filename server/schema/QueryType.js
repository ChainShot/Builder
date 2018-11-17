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

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    stage: {
      type: StageType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: function (_, {id}) {
        return dbResolver(MODEL_DB.STAGES, id)
      }
    },
    stages: {
      type: new GraphQLList(StageType),
      args: {
        containsId: { type: new GraphQLList(GraphQLString) }
      },
      resolve: async (_, { containsId }) => {
        const ids = containsId || await dbReader(MODEL_DB.STAGES);
        return Promise.all(ids.map(id => dbResolver(MODEL_DB.STAGES, id)));
      }
    },
    stageContainerGroup: {
      type: StageContainerGroupType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: function (_, {id}) {
        return dbResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, id)
      }
    },
    stageContainerGroups: {
      type: new GraphQLList(StageContainerGroupType),
      args: {
        containsId: { type: new GraphQLList(GraphQLString) }
      },
      resolve: async (_, { containsId }) => {
        const ids = containsId || (await dbReader(MODEL_DB.STAGE_CONTAINER_GROUPS));
        return Promise.all(ids.map(id => dbResolver(MODEL_DB.STAGE_CONTAINER_GROUPS, id)));
      }
    },
    stageContainer: {
      type: StageContainerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: function (_, {id}) {
        return dbResolver(MODEL_DB.STAGE_CONTAINERS, id)
      }
    },
    stageContainers: {
      type: new GraphQLList(StageContainerType),
      args: {
        containsId: { type: new GraphQLList(GraphQLString) }
      },
      resolve: async (_, { containsId }) => {
        const ids = containsId || (await dbReader(MODEL_DB.STAGE_CONTAINERS));
        return Promise.all(ids.map(id => dbResolver(MODEL_DB.STAGE_CONTAINERS, id)));
      }
    },
    codeFile: {
      type: CodeFileType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: function (_, {id}) {
        return dbResolver(MODEL_DB.CODE_FILES, id)
      }
    },
    codeFiles: {
      type: new GraphQLList(CodeFileType),
      args: {
        containsId: { type: new GraphQLList(GraphQLString) }
      },
      resolve: async (_, { containsId }) => {
        const ids = containsId || await dbReader(MODEL_DB.CODE_FILES);
        return Promise.all(ids.map(id => dbResolver(MODEL_DB.CODE_FILES, id)));
      }
    }
  }
});

module.exports = QueryType;
