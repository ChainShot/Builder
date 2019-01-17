const assert = require('assert');
const path = require('path');
const {
  constants: {
    LOOKUP_KEY,
    CODE_FILE_PROJECT_PATHS,
    SOLUTION_PROJECT_PATH,
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

const destroyCodeFile = mutationWrapper(require('../../../src/schema/mutations/codeFile/destroy'));
const existingSolutions = [
  { id: 2, codeFileId: 1, },
  { id: 3, codeFileId: 1, },
]
const existingCodeFile = {
  id: 1,
  initialCode: LOOKUP_KEY,
  executablePath: 'contracts/thing.sol',
}

mockSuite('Mutations::CodeFiles::Destroy', () => {
  before(async () => {
    mockConfigDocument(MODEL_DB.CODE_FILES, existingCodeFile);
    existingSolutions.forEach(solution => {
      mockConfigDocument(MODEL_DB.SOLUTIONS, solution);
    });
    await destroyCodeFile(existingCodeFile.id);
  });

  it('should have removed the codeFile', () => {
    assert(removedModels.codeFiles[existingCodeFile.id]);
  });

  it('should have removed the solutions', () => {
    existingSolutions.forEach(solution => {
      assert(removedModels.solutions[solution.id]);
    });
  });

  it('should have removed the solution project path', () => {
    existingSolutions.forEach(solution => {
      const solutionPath = path.join(SOLUTION_PROJECT_PATH, existingCodeFile.executablePath);
      assert(removedFiles[solutionPath]);
    });
  });

  it('should have removed the codeFile project paths', () => {
    CODE_FILE_PROJECT_PATHS.forEach((filePath) => {
      assert(removedFiles[filePath]);
    });
  });
});
