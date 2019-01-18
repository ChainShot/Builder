const assert = require('assert');
const path = require('path');
const {
  constants: {
    CODE_FILE_PROJECT_PATHS,
    SOLUTION_PROJECT_PATH,
    LOOKUP_KEY,
    MODEL_DB,
  },
  testData: {
    writtenFiles,
    writtenModels,
    renamed,
  },
  mutationWrapper,
  mockConfigDocument,
  mockSuite,
} = require('../util');

const modifyCodeFile = mutationWrapper(require('../../../src/schema/mutations/codeFile/modify'));

const existingCodeFile = {
  id: 1,
  initialCode: LOOKUP_KEY,
  hasProgress: true,
  executablePath: "contracts/thing.sol",
  codeStageIds: [3],
}

const existingSolution = {
  id: 2,
  codeFileId: existingCodeFile.id,
  stageId: existingCodeFile.codeStageIds[0],
}

mockSuite('Mutations::CodeFiles::Modify::Properties', () => {
  before(async () => {
    mockConfigDocument(MODEL_DB.CODE_FILES, existingCodeFile);
    mockConfigDocument(MODEL_DB.SOLUTIONS, existingSolution);
    await modifyCodeFile(modifyProps);
  });

  const modifyProps = {
    id: existingCodeFile.id,
    initialCode: "var a = 1",
    executablePath: "contracts/newThing.sol",
  }

  it('should still have a lookup key for code', () => {
    assert.equal(existingCodeFile.initialCode, LOOKUP_KEY);
  });

  describe('modified files', () => {
    it('should have updated the codefile project files', () => {
      CODE_FILE_PROJECT_PATHS.forEach((filePath) => {
        assert.equal(writtenFiles[filePath], modifyProps.initialCode);
      });
    });

    it('should have renamed the solution project files', () => {
      const oldPath = path.join(SOLUTION_PROJECT_PATH, existingCodeFile.executablePath);
      const newPath = path.join(SOLUTION_PROJECT_PATH, modifyProps.executablePath);
      assert.equal(renamed[path])
    });
  });
});

mockSuite("Mutations::CodeFiles::Modify::CodeStageId", () => {
  const newStageId = 5;
  before(async () => {
    mockConfigDocument(MODEL_DB.CODE_FILES, existingCodeFile);
    mockConfigDocument(MODEL_DB.SOLUTIONS, existingSolution);
    await modifyCodeFile({
      id: existingCodeFile.id,
      codeStageIds: existingCodeFile.codeStageIds.concat(newStageId),
    });
  });

  it('should create a solution', async () => {
    const newSolution = writtenModels[MODEL_DB.SOLUTIONS].find(x => x.stageId === newStageId);
    assert(newSolution);
  });
})
