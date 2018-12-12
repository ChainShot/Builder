const assert = require('assert');
const {
  ioHelpers,
  projectHelpers,
  mockConfigDocument,
  removedModels,
  removedFiles,
  LOOKUP_KEY,
  STAGE_CONTAINER_PROJECT_PATH,
  MODEL_DB,
  mockSuite,
} = require('../util');
const path = require('path');
const destroyStageContainer = require('../../../src/schema/mutations/stageContainer/destroy');
const destroy = destroyStageContainer(ioHelpers, projectHelpers);
const existingStageContainer = {
  id: 1,
  intro: LOOKUP_KEY,
}

mockSuite('Mutations::StageContainers::Destroy', () => {
  before(async () => {
    mockConfigDocument(MODEL_DB.STAGE_CONTAINERS, existingStageContainer);
    await destroy(existingStageContainer.id);
  });

  it('should have removed the stageContainer', () => {
    assert(removedModels.stageContainers[existingStageContainer.id]);
  });

  it('should have removed the intro project path', () => {
    const introPath = path.join(STAGE_CONTAINER_PROJECT_PATH, "intro.md");
    assert(removedFiles[introPath]);
  });
});
