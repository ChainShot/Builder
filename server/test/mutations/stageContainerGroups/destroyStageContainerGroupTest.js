const assert = require('assert');
const {
  constants: {
    LOOKUP_KEY,
    MODEL_DB,
  },
  testData: {
    removedModels,
    removedFiles,
  },
  mutationWrapper,
  mockConfigDocument,
  mockSuite,
} = require('../util');
const path = require('path');
const destroyStageContainerGroup = mutationWrapper(require('../../../src/schema/mutations/stageContainerGroup/destroy'));

const existingStageContainerGroup = {
  id: 1,
  intro: LOOKUP_KEY,
  title: "Group",
}

mockSuite('Mutations::StageContainerGroups::Destroy', () => {
  before(async () => {
    mockConfigDocument(MODEL_DB.STAGE_CONTAINER_GROUPS, existingStageContainerGroup);
    await destroyStageContainerGroup(existingStageContainerGroup.id);
  });

  it('should have removed the stageContainerGroup', () => {
    assert(removedModels.stageContainerGroups[existingStageContainerGroup.id]);
  });
});
