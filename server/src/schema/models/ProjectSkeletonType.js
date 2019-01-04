const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const ProjectSkeletonType = new GraphQLObjectType({
  name: 'ProjectSkeleton',
  fields: () => ({
    id: { type: GraphQLString },
    ghNodeId: { type: GraphQLString },
    ghRepoId: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    thumbnailUrl: { type: GraphQLString },
    zipName: { type: GraphQLString },
  })
});

module.exports = ProjectSkeletonType;
