const assert = require('assert');
const destroyStage = require('../../../src/schema/mutations/stage/destroy');
const path = require('path');
const {
  ioHelpers,
  projectHelpers,
  mockConfigDocument,
  removedModels,
  removedFiles,
  LOOKUP_KEY,
  STAGE_PROJECT_PATH,
  MODEL_DB,
  mockSuite,
} = require('../util');

const destroy = destroyStage(ioHelpers, projectHelpers);
const existingStage = {
  id: 1,
  task: LOOKUP_KEY,
  abiValidations: LOOKUP_KEY,
  details: LOOKUP_KEY,
}

mockSuite('Mutations::Stages::Destroy', () => {
  before(async () => {
    mockConfigDocument(MODEL_DB.STAGES, existingStage);
    await destroy(existingStage.id);
  });

  it('should have removed the stage', () => {
    assert(removedModels.stages[existingStage.id]);
  });

  it('should have removed the task project path', () => {
    const filePath = path.join(STAGE_PROJECT_PATH, "task.md");
    assert(removedFiles[filePath]);
  });

  it('should have removed the details project path', () => {
    const filePath = path.join(STAGE_PROJECT_PATH, "details.md");
    assert(removedFiles[filePath]);
  });

  it('should have removed the validations project path', () => {
    const filePath = path.join(STAGE_PROJECT_PATH, "validations.json");
    assert(removedFiles[filePath]);
  });
});
