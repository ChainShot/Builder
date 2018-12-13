const assert = require('assert');
const {
  MONGO_ID_REGEX,
  LOOKUP_KEY,
  writtenModelsLookup,
  writtenFiles,
  ioHelpers,
  projectHelpers,
  mockSuite,
} = require('../util');
const createStageContainerGroup = require('../../../src/schema/mutations/stageContainerGroup/create');
const create = createStageContainerGroup(ioHelpers, projectHelpers);

mockSuite('Mutations::StageContainerGroups::Create', () => {
  let stageContainerGroup;
  const title = 'Happy';
  const containerType = 'BuildingBlock';

  before(async () => {
    stageContainerGroup = await create({title, containerType});
  });

  describe('properties', () => {
    it('should have an id', () => {
      assert(MONGO_ID_REGEX.test(stageContainerGroup.id));
    });

    it('should have set the title', () => {
      assert.equal(stageContainerGroup.title, title);
    });

    it('should have set the containerType', () => {
      assert.equal(stageContainerGroup.containerType, containerType);
    });
  });
});
