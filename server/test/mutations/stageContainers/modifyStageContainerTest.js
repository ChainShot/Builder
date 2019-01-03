const assert = require('assert');
const {
  constants: {
    STAGE_CONTAINER_PROJECT_PATH,
    MONGO_ID_REGEX,
    LOOKUP_KEY,
    MODEL_DB,
  },
  testData: {
    writtenModelsLookup,
    mockCollections,
    writtenFiles,
  },
  mockConfigDocument,
  mutationWrapper,
  mockSuite,
} = require('../util');
const path = require('path');
const modifyStageContainer = mutationWrapper(require('../../../src/schema/mutations/stageContainer/modify'));

const existingStageContainerGroup = {
  id: 2,
  containerType: 'BuildingBlock',
}

const existingStageContainer = {
  id: 1,
  stageContainerGroupId: 2,
  intro: LOOKUP_KEY,
  type: 'BuildingBlock',
}

mockSuite('Mutations::StageContainers::Modify', () => {
  let stageContainer;
  const intro = "WELCOME";
  const newType = 'Challenge';

  before(async () => {
    mockConfigDocument(MODEL_DB.STAGE_CONTAINER_GROUPS, existingStageContainerGroup);
    mockConfigDocument(MODEL_DB.STAGE_CONTAINERS, existingStageContainer);
    stageContainer = await modifyStageContainer({
      id: existingStageContainer.id,
      intro,
      type: newType,
    });
  });

  describe('properties', () => {
    it('should an intro with a lookup', () => {
      assert.equal(stageContainer.intro, LOOKUP_KEY);
    });

    it('should have updated the group containerType', () => {
      const mockedGroup = mockCollections[MODEL_DB.STAGE_CONTAINER_GROUPS][existingStageContainerGroup.id];
      assert.equal(mockedGroup.containerType, newType)
    })
  });

  describe('written files', () => {
    it('should have written a project intro file', () => {
      const introPath = path.join(STAGE_CONTAINER_PROJECT_PATH, "intro.md");
      assert.equal(writtenFiles[introPath], intro);
    });
  });
});
