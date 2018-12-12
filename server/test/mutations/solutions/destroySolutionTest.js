const assert = require('assert');
const destroySolution = require('../../../src/schema/mutations/solution/destroy');
const {
  ioHelpers,
  projectHelpers,
  mockConfigDocument,
  removedModels,
  removedFiles,
  LOOKUP_KEY,
  SOLUTION_PROJECT_PATH,
  MODEL_DB,
  mockSuite,
} = require('../util');

const destroy = destroySolution(ioHelpers, projectHelpers);
const existingSolution = {
  id: 1,
  codeFileId: 2,
  stageId: 3,
  code: LOOKUP_KEY,
}

mockSuite('Mutations::Solutions::Destroy', () => {
  before(async () => {
    mockConfigDocument(MODEL_DB.SOLUTIONS, existingSolution);
    await destroy(existingSolution.id);
  });

  it('should have removed the solution', () => {
    assert(removedModels.solutions[existingSolution.id]);
  });

  it('should have removed the solution project path', () => {
    assert(removedFiles[SOLUTION_PROJECT_PATH]);
  });
});
