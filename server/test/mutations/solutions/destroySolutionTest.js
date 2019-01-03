const assert = require('assert');
const path = require('path');
const {
  constants: {
    LOOKUP_KEY,
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

const destroySolution = mutationWrapper(require('../../../src/schema/mutations/solution/destroy'));

const existingCodeFile = {
  id: 2,
  executablePath: "contracts/code.sol",
}

const existingSolution = {
  id: 1,
  codeFileId: existingCodeFile.id,
  stageId: 3,
  code: LOOKUP_KEY,
}

mockSuite('Mutations::Solutions::Destroy', () => {
  before(async () => {
    mockConfigDocument(MODEL_DB.CODE_FILES, existingCodeFile);
    mockConfigDocument(MODEL_DB.SOLUTIONS, existingSolution);
    await destroySolution(existingSolution.id);
  });

  it('should have removed the solution', () => {
    assert(removedModels.solutions[existingSolution.id]);
  });

  it('should have removed the solution project path', () => {
    const solutionPath = path.join(SOLUTION_PROJECT_PATH, existingCodeFile.executablePath);
    assert(removedFiles[solutionPath]);
  });
});
