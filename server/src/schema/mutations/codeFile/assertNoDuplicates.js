module.exports = (injections) => {
  const {
    config: { MODEL_DB },
    ioHelpers: { configResolver },
  } = injections;

  async function assertNoDuplicates(codeFile) {
    // we'll want to make sure that stages dont have
    // code files with the same output path
    for(let i = 0; i < (codeFile.codeStageIds || []).length; i++) {
      const stage = await configResolver(MODEL_DB.STAGES, codeFile.codeStageIds[i]);
      for(let j = 0; j < (stage.codeFileIds || []).length; j++) {
        const codeFileId = stage.codeFileIds[j];
        if(codeFileId !== codeFile.id) {
          const otherCodeFile = await configResolver(MODEL_DB.CODE_FILES, codeFileId);
          if(otherCodeFile.executablePath === codeFile.executablePath) {
            throw new Error(`Two Code Files with the same executable path: ${codeFile.executablePath}`);
          }
        }
      }
    }
  }

  return assertNoDuplicates;
}
