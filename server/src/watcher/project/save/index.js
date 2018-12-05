const { fileResolver, fileWriter } = require('../../../utils/ioHelpers');
const getCodeFilePathParts = require('./getCodeFilePathParts');
const findCodeFilePaths = require('../../../projectHelpers/findCodeFilePaths');
const schema = require('../../../schema');
const { graphql } = require('graphql');
const path = require('path');

const findContainer = `
query findStageContainerGroup($title: String) {
  stageContainerGroup(title: $title) {
    stageContainers {
      version
      stages {
        title
        codeFiles {
          executablePath
          codeStageIds
          name
        }
      }
    }
  }
}
`;

async function save(filePath) {
  const parts = getCodeFilePathParts(filePath);
  if(parts) {
    const { groupTitle, containerVersion, stageTitle, executablePath } = parts;

    const {stageContainerGroup} = (await graphql(schema, findContainer, null, null, { title: groupTitle })).data;
    const stageContainer = stageContainerGroup.stageContainers.find(x => x.version === containerVersion);
    const stage = stageContainer.stages.find(x => x.title === stageTitle);
    const codeFile = stage.codeFiles.find(x => x.executablePath === executablePath);

    const paths = await findCodeFilePaths(codeFile);

    for(let i = 0; i < paths.length; i++) {
      const contents = await fileResolver(filePath);
      const thisPath = paths[i];
      // no sense overwriting the one that just changed
      if(thisPath !== filePath) {
        const thisContents = await fileResolver(thisPath);
        // dont overwrite files that have the same contents
        // otherwise this could lead to a recursive loop of file updating
        if(contents !== thisContents) {
          await fileWriter(thisPath, contents);
        }
      }
    }
  }
}

module.exports = save;
