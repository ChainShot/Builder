const assert = require('assert');
const path = require('path');
const {
  constants: {
    LOOKUP_KEY,
    STAGE_PROJECT_PATH,
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
const destroyStage = mutationWrapper(require('../../../src/schema/mutations/stage/destroy'));

const existingCodeFile = {
  id: 4,
  initialCode: LOOKUP_KEY,
  codeStageIds: [1],
}
const existingSolutions = [
  { id: 2, codeFileId: existingCodeFile.id, },
  { id: 3, codeFileId: existingCodeFile.id, },
]
const existingStage = {
  id: 1,
  task: LOOKUP_KEY,
  abiValidations: LOOKUP_KEY,
  details: LOOKUP_KEY,
  codeFileIds: [existingCodeFile.id]
}

mockSuite('Mutations::Stages::Destroy', () => {
  before(async () => {
    existingSolutions.forEach((solution) => {
      mockConfigDocument(MODEL_DB.SOLUTIONS, solution);
    });
    mockConfigDocument(MODEL_DB.CODE_FILES, existingCodeFile);
    mockConfigDocument(MODEL_DB.STAGES, existingStage);
    await destroyStage(existingStage.id);
  });

  it('should have removed the stage', () => {
    assert(removedModels.stages[existingStage.id]);
  });

  it('should have removed the codeFile', () => {
    assert(removedModels.codeFiles[existingCodeFile.id]);
  });

  it('should have removed the solutions', () => {
    existingSolutions.forEach(solution => {
      assert(removedModels.solutions[solution.id]);
    });
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
