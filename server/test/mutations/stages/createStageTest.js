const assert = require('assert');
const {
  MONGO_ID_REGEX,
  LOOKUP_KEY,
  STAGE_PROJECT_PATH,
  writtenModelsLookup,
  writtenFiles,
  ioHelpers,
  projectHelpers,
  mockSuite,
} = require('../util');
const createStage = require('../../../src/schema/mutations/stage/create');
const create = createStage(ioHelpers, projectHelpers);
const path = require('path');

mockSuite('Mutations::Stages::Create', () => {
  let stage;
  const abiValidations = "{ a: true }";
  const details = "Some info";
  const task = "Task"

  before(async () => {
    stage = await create({
      abiValidations,
      details,
      task
    });
  });

  describe('properties', () => {
    it('should have an id', () => {
      assert(MONGO_ID_REGEX.test(stage.id));
    });

    it('should have set validations', () => {
      assert.equal(stage.abiValidations, LOOKUP_KEY);
    });

    it('should have set details', () => {
      assert.equal(stage.details, LOOKUP_KEY);
    });

    it('should have set a task', () => {
      assert.equal(stage.task, LOOKUP_KEY);
    });
  });

  describe('written files', () => {
    it('should have written a project details file', () => {
      const detailsPath = path.join(STAGE_PROJECT_PATH, "details.md");
      assert.equal(writtenFiles[detailsPath], details);
    });

    it('should have written a project task file', () => {
      const taskPath = path.join(STAGE_PROJECT_PATH, "task.md");
      assert.equal(writtenFiles[taskPath], task);
    });

    it('should have written a project validations file', () => {
      const validationsPath = path.join(STAGE_PROJECT_PATH, "validations.json");
      assert.equal(writtenFiles[validationsPath], abiValidations);
    });

    it('should have written a stage config file', () => {
      assert.equal(writtenModelsLookup.stages[stage.id], stage)
    });
  });
});
