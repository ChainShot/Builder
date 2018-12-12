const assert = require('assert');
const {
  MONGO_ID_REGEX,
  LOOKUP_KEY,
  STAGE_CONTAINER_PROJECT_PATH,
  MODEL_DB,
  mockConfigDocument,
  writtenModelsLookup,
  writtenFiles,
  ioHelpers,
  projectHelpers,
  mockSuite,
} = require('../util');
const createStageContainer = require('../../../src/schema/mutations/stageContainer/create');
const create = createStageContainer(ioHelpers, projectHelpers);
const path = require('path');

mockSuite('Mutations::StageContainers::Create', () => {
  let stageContainer;
  const stageContainerGroupId = "1";
  const containerType = "BuildingBlock";

  before(async () => {
    mockConfigDocument(MODEL_DB.STAGE_CONTAINER_GROUPS, {
      id: stageContainerGroupId,
      containerType,
    })
    stageContainer = await create(stageContainerGroupId);
  });

  describe('properties', () => {
    it('should have an id', () => {
      assert(MONGO_ID_REGEX.test(stageContainer.id));
    });

    it('should have set type', () => {
      assert.equal(stageContainer.type, containerType);
    });

    it('should have set stageContainerGroupId', () => {
      assert.equal(stageContainer.stageContainerGroupId, stageContainerGroupId);
    });
  });
});
