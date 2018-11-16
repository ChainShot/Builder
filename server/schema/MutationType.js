const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');
const CodeFileType = require('./CodeFileType');
const { dbWriter, fileWriter, dbResolver, fileRemove } = require('./utils');
const codeFileLookup = require('./lookups/codeFileLookup');
const { LOOKUP_KEY } = require('../config');

const codeFileProjectProps = {
  initialCode: codeFileLookup
}

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createCodeFile: {
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
    modifyCodeFile: {
      type: CodeFileType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        executable: { type: GraphQLBoolean },
        executablePath: { type: GraphQLString },
        initialCode: { type: GraphQLString },
      },
      async resolve (_, props) {
        const codeFile = await dbResolver('code_files', props.id);
        const merged = { ...codeFile, ...props };

        const keys = Object.keys(merged);
        for(let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if(codeFileProjectProps[key]) {
            const previousPaths = await codeFileProjectProps[key](codeFile);
            await Promise.all(previousPaths.map(async (path) => {
              await fileRemove(path);
            }));
            const paths = await codeFileProjectProps[key](merged);
            await Promise.all(paths.map(async (path) => {
              await fileWriter(path, merged[key]);
            }));
            merged[key] = LOOKUP_KEY;
          }
        }
        console.log('wtf is it all', merged)

        await dbWriter('code_files', merged);
      }
    }
  }
})

module.exports = MutationType;
