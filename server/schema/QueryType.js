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
        return dbResolver('stages', id)
      }
    },
    stages: {
      type: new GraphQLList(StageType),
      args: {
        containsId: { type: new GraphQLList(GraphQLString) }
      },
      resolve: async (_, { containsId }) => {
        const ids = containsId || await dbReader('stages');
        return Promise.all(ids.map(id => dbResolver('stages', id)));
      }
    },
    stageContainerGroup: {
      type: StageContainerGroupType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: function (_, {id}) {
        return dbResolver('stage_container_groups', id)
      }
    },
    stageContainerGroups: {
      type: new GraphQLList(StageContainerGroupType),
      args: {
        containsId: { type: new GraphQLList(GraphQLString) }
      },
      resolve: async (_, { containsId }) => {
        const ids = containsId || (await dbReader('stage_container_groups'));
        return Promise.all(ids.map(id => dbResolver('stage_container_groups', id)));
      }
    },
    stageContainer: {
      type: StageContainerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: function (_, {id}) {
        return dbResolver('stage_containers', id)
      }
    },
    stageContainers: {
      type: new GraphQLList(StageContainerType),
      args: {
        containsId: { type: new GraphQLList(GraphQLString) }
      },
      resolve: async (_, { containsId }) => {
        const ids = containsId || (await dbReader('stage_containers'));
        return Promise.all(ids.map(id => dbResolver('stage_containers', id)));
      }
    },
    codeFile: {
      type: CodeFileType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: function (_, {id}) {
        return dbResolver('code_files', id)
      }
    },
    codeFiles: {
      type: new GraphQLList(CodeFileType),
      args: {
        containsId: { type: new GraphQLList(GraphQLString) }
      },
      resolve: async (_, { containsId }) => {
        const ids = containsId || await dbReader('code_files');
        return Promise.all(ids.map(id => dbResolver('code_files', id)));
      }
    }
  }
});

module.exports = QueryType;
