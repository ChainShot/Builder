const assert = require('assert');
const path = require('path');
const {
  constants: {
    SOLUTION_PROJECT_PATH,
    LOOKUP_KEY,
    MODEL_DB,
  },
  testData: {
    writtenFiles,
  },
  mutationWrapper,
  mockConfigDocument,
  mockSuite,
} = require('../util');

const modifySolution = mutationWrapper(require('../../../src/schema/mutations/solution/modify'));

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

mockSuite('Mutations::Solutions::Modify', () => {
  const modifyProps = {
    id: existingSolution.id,
    code: "var a = 1",
  }

  let solution;
  before(async () => {
    mockConfigDocument(MODEL_DB.CODE_FILES, existingCodeFile);
    mockConfigDocument(MODEL_DB.SOLUTIONS, existingSolution);
    solution = await modifySolution(modifyProps);
  });

  describe('properties', () => {
    it('should still have a lookup key for code', () => {
      assert.equal(solution.code, LOOKUP_KEY);
    });
  });

  describe('modified files', () => {
    it('should have updated the solution project file', () => {
      const solutionPath = path.join(SOLUTION_PROJECT_PATH, existingCodeFile.executablePath);
      assert.equal(writtenFiles[solutionPath], modifyProps.code);
    });
  });
});
