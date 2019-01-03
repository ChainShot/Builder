const assert = require('assert');
const path = require('path');
const {
  constants: {
    SOLUTION_PROJECT_PATH,
    MONGO_ID_REGEX,
    LOOKUP_KEY,
    MODEL_DB,
  },
  testData: {
    writtenModelsLookup,
    writtenFiles,
  },
  mutationWrapper,
  mockConfigDocument,
  mockSuite,
} = require('../util');
const createSolution = mutationWrapper(require('../../../src/schema/mutations/solution/create'));

const existingCodeFile = {
  id: 2,
  executablePath: "contracts/code.sol",
}

mockSuite('Mutations::Solutions::Create', () => {
  let solution;
  const stageId = 1;

  before(async () => {
    mockConfigDocument(MODEL_DB.CODE_FILES, existingCodeFile);
    solution = await createSolution(stageId, existingCodeFile.id);
  });

  describe('properties', () => {
    it('should have an id', () => {
      assert(MONGO_ID_REGEX.test(solution.id));
    });

    it('should have set the stageId', () => {
      assert.equal(solution.stageId, stageId);
    });

    it('should have set the codeFileId', () => {
      assert.equal(solution.codeFileId, existingCodeFile.id);
    });

    it('should have set a lookup for the code', () => {
      assert.equal(solution.code, LOOKUP_KEY);
    });
  });

  describe('written files', () => {
    it('should have written a blank project file to the solution path', () => {
      const solutionPath = path.join(SOLUTION_PROJECT_PATH, existingCodeFile.executablePath);
      assert.equal(writtenFiles[solutionPath], "");
    });

    it('should have written a solutions config file', () => {
      assert.equal(writtenModelsLookup.solutions[solution.id], solution)
    });
  });
});
