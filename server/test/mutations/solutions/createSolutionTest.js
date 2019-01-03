const assert = require('assert');
const {
  constants: {
    MONGO_ID_REGEX,
    LOOKUP_KEY,
    SOLUTION_PROJECT_PATH,
  },
  testData: {
    writtenModelsLookup,
    writtenFiles,
  },
  mutationWrapper,
  mockSuite,
} = require('../util');
const createSolution = mutationWrapper(require('../../../src/schema/mutations/solution/create'));

mockSuite('Mutations::Solutions::Create', () => {
  let solution;
  const stageId = 1;
  const codeFileId = 2;

  before(async () => {
    solution = await createSolution(stageId, codeFileId);
  });

  describe('properties', () => {
    it('should have an id', () => {
      assert(MONGO_ID_REGEX.test(solution.id));
    });

    it('should have set the stageId', () => {
      assert.equal(solution.stageId, stageId);
    });

    it('should have set the codeFileId', () => {
      assert.equal(solution.codeFileId, codeFileId);
    });

    it('should have set a lookup for the code', () => {
      assert.equal(solution.code, LOOKUP_KEY);
    });
  });

  describe('written files', () => {
    it('should have written a blank project file to the solution path', () => {
      assert.equal(writtenFiles[SOLUTION_PROJECT_PATH], "");
    });

    it('should have written a solutions config file', () => {
      assert.equal(writtenModelsLookup.solutions[solution.id], solution)
    });
  });
});
