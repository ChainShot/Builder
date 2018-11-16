const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');
const CodeFileType = require('./CodeFileType');
const { dbWriter, fileWriter, dbResolver } = require('./utils');
const codeFileLookup = require('./lookups/codeFileLookup');

const codeFileProjectProps = {
  initialCode: codeFileLookup
}

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    create: {
      type: CodeFileType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        executable: { type: GraphQLBoolean }
      },
      async resolve (_, props) {
        return dbWriter('code_files', props);
      }
    },
    modify: {
      type: CodeFileType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        executable: { type: GraphQLBoolean },
        initialCode: { type: GraphQLString },
      },
      async resolve (_, props) {
        const codeFile = await dbResolver('code_files', props.id);
        const keys = Object.keys(props);
        for(let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if(codeFileProjectProps[key]) {
            const paths = await codeFileProjectProps[key](codeFile)
            await paths.map(async (path) => {
              await fileWriter(path, props[key]);
            });
            props[key] = paths;
          }
        }
        const merged = { ...codeFile, ...props };
        return dbWriter('code_files', merged);
      }
    }
  }
})

module.exports = MutationType;
