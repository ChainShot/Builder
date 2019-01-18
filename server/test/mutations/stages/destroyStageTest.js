const assert = require('assert');
const path = require('path');
const {
  constants: {
    LOOKUP_KEY,
    STAGE_PROJECT_PATH,
    CODE_FILE_PROJECT_PATHS,
    MODEL_DB,
  },
  testData: {
    removedModels,
    removedDirectories,
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
  executablePath: 'contracts/thing.sol',
}
const existingSolutions = [
  { id: 2,
    codeFileId: existingCodeFile.id,
    stageId: 1 },
  { id: 3,
    codeFileId: existingCodeFile.id,
    stageId: 1 },
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

  it('should have removed the whole project path', () => {
    assert(removedDirectories[STAGE_PROJECT_PATH]);
  });

  describe('codefile', () => {
    it('should have removed the codeFile', () => {
      assert(removedModels.codeFiles[existingCodeFile.id]);
    });

    it('should have removed the solutions', () => {
      existingSolutions.forEach(solution => {
        assert(removedModels.solutions[solution.id]);
      });
    });
  });
});
