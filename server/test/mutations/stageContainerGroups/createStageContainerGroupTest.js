const assert = require('assert');
const {
  MONGO_ID_REGEX,
  LOOKUP_KEY,
  writtenModelsLookup,
  writtenFiles,
  mutationWrapper,
  mockSuite,
} = require('../util');
const createStageContainerGroup = mutationWrapper(require('../../../src/schema/mutations/stageContainerGroup/create'));

mockSuite('Mutations::StageContainerGroups::Create', () => {
  let stageContainerGroup;
  const title = 'Happy';
  const containerType = 'BuildingBlock';

  before(async () => {
    stageContainerGroup = await createStageContainerGroup({title, containerType});
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
