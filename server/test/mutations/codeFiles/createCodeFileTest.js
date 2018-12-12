const assert = require('assert');
const createCodeFile = require('../../../src/schema/mutations/codeFile/create');
const {
  MONGO_ID_REGEX,
  LOOKUP_KEY,
  SOLUTION_PROJECT_PATH,
  writtenModels,
  writtenFiles,
  ioHelpers,
  projectHelpers,
  mockSuite,
} = require('../util');

const create = createCodeFile(ioHelpers, projectHelpers);

mockSuite('Mutations::CodeFiles::Create', () => {
  describe('Creating a test file', () => {
    const testFile = {
      testFixture: true,
      name: 'testFile.js',
    }

    before(async () => {
      await create(testFile);
    });

    describe('Created model', () => {
      let codeFile;
      before(() => {
        codeFile = writtenModels.codeFiles[0];
      });

      it('should have created a single codeFile', () => {
        assert.equal(writtenModels.codeFiles.length, 1);
      });

      it('should be a test fixture', () => {
        assert.equal(codeFile.testFixture, true);
      });

      it('should have stored the name', () => {
        assert.equal(codeFile.name, testFile.name);
      });

      it('should have created an executable path', () => {
        assert.equal(codeFile.executablePath, testFile.name);
      });

      it('should store initialCode as a lookup key', () => {
        assert.equal(codeFile.initialCode, LOOKUP_KEY);
      });
    });
  });
});
