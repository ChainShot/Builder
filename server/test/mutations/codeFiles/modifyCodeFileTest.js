const assert = require('assert');
const {
  constants: {
    CODE_FILE_PROJECT_PATHS,
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

const modifyCodeFile = mutationWrapper(require('../../../src/schema/mutations/codeFile/modify'));

const existingCodeFile = {
  id: 1,
  initialCode: LOOKUP_KEY,
}

mockSuite('Mutations::CodeFiles::Modify', () => {
  const modifyProps = {
    id: existingCodeFile.id,
    initialCode: "var a = 1",
  }

  before(async () => {
    mockConfigDocument(MODEL_DB.CODE_FILES, existingCodeFile);
    await modifyCodeFile(modifyProps);
  });

  describe('properties', () => {
    it('should still have a lookup key for code', () => {
      assert.equal(existingCodeFile.initialCode, LOOKUP_KEY);
    });
  });

  describe('modified files', () => {
    it('should have updated the codefile project files', () => {
      CODE_FILE_PROJECT_PATHS.forEach((filePath) => {
        assert.equal(writtenFiles[filePath], modifyProps.initialCode);
      });
    });
  });
});
