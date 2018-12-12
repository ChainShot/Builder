const schema = require('../schema');
const { graphql } = require('graphql');

const findContainer = `
query findStageContainerGroup($title: String) {
  stageContainerGroup(title: $title) {
    stageContainers {
      version
      id
    }
  }
}
`;

const stageContainerLookup = async (fileName) => {
  const [groupTitle, version] = fileName.split('/');
  const { data } = await graphql(schema, findContainer, null, null, { title: groupTitle });
  const { id } = data.stageContainerGroup.stageContainers.filter(x => x.version == version)[0];
  return { modelType: 'stageContainer', id };
}

module.exports = stageContainerLookup;
