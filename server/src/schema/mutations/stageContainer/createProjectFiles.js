const stageContainerProjectProps = require('./projectProps');
const path = require('path');

module.exports = ({
  ioHelpers: { fileWriter },
  projectHelpers: { findStageContainerFilePath },
}) => {
  async function createProjectFiles(stageContainer) {
    const basePath = await findStageContainerFilePath(stageContainer);
    const keys = Object.keys(stageContainerProjectProps);
    for(let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const filename = stageContainerProjectProps[key];
        const contents = stageContainer[key] || "";
        await fileWriter(path.join(basePath, filename), contents);
    }
  }

  return createProjectFiles;
}
