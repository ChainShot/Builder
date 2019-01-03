const assert = require('assert');
const {
  constants: {
    MONGO_ID_REGEX,
    LOOKUP_KEY,
    STAGE_CONTAINER_PROJECT_PATH,
    STAGE_PROJECT_PATH,
  },
  testData: {
    writtenModelsLookup,
    writtenFiles,
  },
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
  const title = "new title";

  before(async () => {
    stageContainerGroup = await modifyStageContainerGroup({
      title,
    });
  });

  describe('properties', () => {
    it('should have set the new title', () => {
      assert.equal(stageContainerGroup.title, title);
    });
  });
});
