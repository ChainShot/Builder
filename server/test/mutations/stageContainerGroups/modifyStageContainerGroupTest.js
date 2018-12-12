const assert = require('assert');
const {
  MONGO_ID_REGEX,
  LOOKUP_KEY,
  STAGE_CONTAINER_PROJECT_PATH,
  writtenModelsLookup,
  writtenFiles,
  ioHelpers,
  projectHelpers,
  mockSuite,
} = require('../util');
const path = require('path');
const modifyStageContainerGroup = require('../../../src/schema/mutations/stageContainerGroup/modify');
const modify = modifyStageContainerGroup(ioHelpers, projectHelpers);
const existingStageContainerGroup = {
  id: 1,
  title: "original",
}

mockSuite('Mutations::StageContainerGroups::Modify', () => {
  let stageContainerGroup;
  const title = "new title";

  before(async () => {
    stageContainerGroup = await modify({
      title,
    });
  });

  describe('properties', () => {
    it('should have set the new title', () => {
      assert.equal(stageContainerGroup.title, title);
    });
  });
});
