const assert = require('assert');
const {
  MONGO_ID_REGEX,
  LOOKUP_KEY,
  STAGE_CONTAINER_PROJECT_PATH,
  writtenModelsLookup,
  writtenFiles,
  ioHelpers,
  projectHelpers,
  mockSuite,
} = require('../util');
const path = require('path');
const modifyStageContainer = require('../../../src/schema/mutations/stageContainer/modify');
const modify = modifyStageContainer(ioHelpers, projectHelpers);
const existingStageContainer = {
  id: 1,
  intro: LOOKUP_KEY,
}

mockSuite('Mutations::StageContainers::Modify', () => {
  let stageContainer;
  const intro = "WELCOME";

  before(async () => {
    stageContainer = await modify({
      intro,
    });
  });

  describe('properties', () => {
    it('should an intro with a lookup', () => {
      assert.equal(stageContainer.intro, LOOKUP_KEY);
    });
  });

  describe('written files', () => {
    it('should have written a project intro file', () => {
      const introPath = path.join(STAGE_CONTAINER_PROJECT_PATH, "intro.md");
      assert.equal(writtenFiles[introPath], intro);
    });
  });
});
