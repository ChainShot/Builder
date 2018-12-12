const assert = require('assert');
const destroyCodeFile = require('../../../src/schema/mutations/codeFile/destroy');
const {
  ioHelpers,
  projectHelpers,
  mockConfigDocument,
  removedModels,
  removedFiles,
  LOOKUP_KEY,
  CODE_FILE_PROJECT_PATHS,
  MODEL_DB,
  mockSuite,
} = require('../util');

const destroy = destroyCodeFile(ioHelpers, projectHelpers);
const existingCodeFile = {
  id: 1,
  initialCode: LOOKUP_KEY,
}

mockSuite('Mutations::CodeFiles::Destroy', () => {
  before(async () => {
    mockConfigDocument(MODEL_DB.CODE_FILES, existingCodeFile);
    await destroy(existingCodeFile.id);
  });

  it('should have removed the solution', () => {
    assert(removedModels.codeFiles[existingCodeFile.id]);
  });

  it('should have removed the solution project path', () => {
    CODE_FILE_PROJECT_PATHS.forEach((filePath) => {
      assert(removedFiles[filePath]);
    });
  });
});
