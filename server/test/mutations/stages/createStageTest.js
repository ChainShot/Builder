const assert = require('assert');
const {
  constants: {
    MODEL_DB,
    MONGO_ID_REGEX,
    LOOKUP_KEY,
    MOCK_CONFIG,
    STAGE_PROJECT_PATH,
  },
  testData: {
    writtenModelsLookup,
    writtenModels,
    writtenFiles,
    copied,
  },
  mockConfigDocument,
  mutationWrapper,
  mockSuite,
} = require('../util');
const createStage = mutationWrapper(require('../../../src/schema/mutations/stage/create'));
const path = require('path');

mockSuite('Mutations::Stages::CreateBlank', () => {
  let stage;
  const abiValidations = "{ a: true }";
  const details = "Some info";
  const task = "Task"

  before(async () => {
    stage = await createStage({
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

mockSuite('Mutations::Stages::CreateTemplate', () => {
  let stage;
  const containerId = 1;
  const groupId = 2;
  const groupTitle = "group";
  const containerVersion = "version";
  const template = "solidity";
  const newTitle = "title";

  before(async () => {
    mockConfigDocument(MODEL_DB.STAGE_CONTAINER_GROUPS, {
      id: groupId,
      title: groupTitle,
    })
    mockConfigDocument(MODEL_DB.STAGE_CONTAINERS, {
      id: containerId,
      stageContainerGroupId: groupId,
      version: containerVersion,
    })
    stage = await createStage({ containerId, title: newTitle, template });
  });

  it('should have set properties', () => {
    assert.equal(stage.type, "CodeStage");
    assert.equal(stage.language, "solidity");
  });

  it('should have set a new title', () => {
    assert.equal(stage.title, newTitle);
  });

  it('should have written two code files', () => {
    assert.equal(writtenModels.codeFiles.length, 2)
  });

  it('should have written a solution', () => {
    assert.equal(writtenModels.solutions.length, 1)
  });

  it('should have not written a stage container', () => {
    assert.equal(writtenModels.stageContainers.length, 0);
  });

  it('should have written a stage', () => {
    assert.equal(writtenModels.stages.length, 1);
  });

  it('should have copied a directory', () => {
    assert.equal(copied[0].newPath, STAGE_PROJECT_PATH);
  });
})
