const assert = require('assert');
const path = require('path');
const {
  constants: {
    STAGE_PROJECT_PATH,
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
const modifyStage = mutationWrapper(require('../../../src/schema/mutations/stage/modify'));

const existingStage = {
  id: 1,
  task: LOOKUP_KEY,
  abiValidations: LOOKUP_KEY,
  details: LOOKUP_KEY,
}

mockSuite('Mutations::Stage::Modify', () => {
  const modifyProps = {
    id: existingStage.id,
    task: "many things to do",
    abiValidations: "{ a: 3 }",
    details: "how to do them",
  }

  before(async () => {
    mockConfigDocument(MODEL_DB.STAGES, existingStage);
    await modifyStage(modifyProps);
  });

  describe('properties', () => {
    it('should still have a lookup key for task', () => {
      assert.equal(existingStage.task, LOOKUP_KEY);
    });

    it('should still have a lookup key for validations', () => {
      assert.equal(existingStage.abiValidations, LOOKUP_KEY);
    });

    it('should still have a lookup key for details', () => {
      assert.equal(existingStage.details, LOOKUP_KEY);
    });
  });

  describe('modified files', () => {
    it('should have modified a project details file', () => {
      const detailsPath = path.join(STAGE_PROJECT_PATH, "details.md");
      assert.equal(writtenFiles[detailsPath], modifyProps.details);
    });

    it('should have modified a project task file', () => {
      const taskPath = path.join(STAGE_PROJECT_PATH, "task.md");
      assert.equal(writtenFiles[taskPath], modifyProps.task);
    });

    it('should have modified a project validations file', () => {
      const validationsPath = path.join(STAGE_PROJECT_PATH, "validations.json");
      assert.equal(writtenFiles[validationsPath], modifyProps.abiValidations);
    });
  });
});
