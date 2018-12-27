const assert = require('assert');
const {
  mutationWrapper,
  mockConfigDocument,
  removedModels,
  removedFiles,
  LOOKUP_KEY,
  MODEL_DB,
  mockSuite,
} = require('../util');
const path = require('path');
const destroyStageContainerGroup = mutationWrapper(require('../../../src/schema/mutations/stageContainerGroup/destroy'));

const existingStageContainerGroup = {
  id: 1,
  intro: LOOKUP_KEY,
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
