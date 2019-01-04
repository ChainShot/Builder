const assert = require('assert');
const {
  constants: {
    LOOKUP_KEY,
    STAGE_CONTAINER_PROJECT_PATH,
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
const destroyStageContainer = mutationWrapper(require('../../../src/schema/mutations/stageContainer/destroy'));

const existingStageContainer = {
  id: 1,
  intro: LOOKUP_KEY,
}

mockSuite('Mutations::StageContainers::Destroy', () => {
  before(async () => {
    mockConfigDocument(MODEL_DB.STAGE_CONTAINERS, existingStageContainer);
    await destroyStageContainer(existingStageContainer.id);
  });

  it('should have removed the stageContainer', () => {
    assert(removedModels.stageContainers[existingStageContainer.id]);
  });

  it('should have removed the intro project path', () => {
    const introPath = path.join(STAGE_CONTAINER_PROJECT_PATH, "intro.md");
    assert(removedFiles[introPath]);
  });
});
