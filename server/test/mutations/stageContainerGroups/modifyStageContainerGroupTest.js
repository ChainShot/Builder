const assert = require('assert');
const {
  constants: {
    MONGO_ID_REGEX,
    LOOKUP_KEY,
    MODEL_DB,
    STAGE_CONTAINER_PROJECT_PATH,
  },
  testData: {
    writtenModelsLookup,
    writtenFiles,
    renamed,
  },
  mockConfigDocument,
  mutationWrapper,
  mockSuite,
} = require('../util');
const path = require('path');
const modifyStageContainerGroup = mutationWrapper(require('../../../src/schema/mutations/stageContainerGroup/modify'));

const existingStageContainerGroup = {
  id: 1,
  title: "original",
}

mockSuite('Mutations::StageContainerGroups::Modify', () => {
  let stageContainerGroup;
  const newTitle = "new title";

  before(async () => {
    mockConfigDocument(MODEL_DB.STAGE_CONTAINER_GROUPS, existingStageContainerGroup);
    stageContainerGroup = await modifyStageContainerGroup({
      id: existingStageContainerGroup.id,
      title: newTitle,
    });
  });

  describe('properties', () => {
    it('should have set the new title', () => {
      assert.equal(stageContainerGroup.title, newTitle);
    });
  });

  describe('renamed directory', () => {
    it('should have renamed the stageContainer directory', () => {
      const oldPath = path.join(STAGE_CONTAINER_PROJECT_PATH, existingStageContainerGroup.title);
      const newPath = path.join(STAGE_CONTAINER_PROJECT_PATH, newTitle);
      assert.equal(renamed[path])
    });
  });
});
