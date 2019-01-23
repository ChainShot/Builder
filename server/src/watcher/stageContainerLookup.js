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
  const { data: { stageContainerGroup } } = await graphql(schema, findContainer, null, null, { title: groupTitle });
  if(!stageContainerGroup) return null;
  const sc = stageContainerGroup.stageContainers.filter(x => x.version == version)[0];
  if(!sc) return null;
  return { modelType: 'stageContainer', id: sc.id };
}

module.exports = stageContainerLookup;
