const { ObjectID } = require('mongodb');
const cfProjectProps = require('./projectProps');

module.exports = (injections) => {
  const createSolution = require('../solution/create')(injections);
  const validate = require('./validate')(injections);
  const {
    config: { LOOKUP_KEY, MODEL_DB },
    ioHelpers: { configWriter, fileWriter, configResolver },
    projectHelpers: { findCodeFilePaths },
  } = injections;

  async function createDocument({ ...props }) {
    Object.keys(cfProjectProps).forEach(key => {
      props[key] = LOOKUP_KEY;
    })
    return await configWriter(MODEL_DB.CODE_FILES, {
      executablePath: props.executablePath || props.name,
      ...props,
    });
  }

  async function createProjectFiles(props) {
    const keys = Object.keys(cfProjectProps);
    for(let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const paths = await findCodeFilePaths(props);
      await Promise.all(paths.map(async (path) => {
        const contents = props[key] || "";
        return await fileWriter(path, contents);
      }));
    }
  }

  async function createStages(props) {
    const numStages = props.codeStageIds ? props.codeStageIds.length : 0;
    const codeFileId = props.id;
    for(let i = 0; i < numStages; i++) {
      // TODO: should hook into stage/modify.js here
      const stageId = props.codeStageIds[i];
      const stage = await configResolver(MODEL_DB.STAGES, stageId);
      stage.codeFileIds = (stage.codeFileIds || []).concat(codeFileId);
      await configWriter(MODEL_DB.STAGES, stage);

      if(props.hasProgress) {
        await createSolution(stageId, codeFileId);
      }
    }
  }

  async function createCodeFile(props) {
    await validate(props);
    props.id = ObjectID().toString();
    await createStages(props);
    await createProjectFiles(props);
    return await createDocument(props);
  }

  return createCodeFile;
};
