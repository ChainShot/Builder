const stageContainerGroupIds = `
query filterStageContainerGroups($filter: String) {
  stageContainerGroups(filter: $filter) {
    id
	}
}`;

const stageContainerGroupsByIds = `
query stageContainerGroupsByIds($containsId: [String]) {
  stageContainerGroups(containsId: $containsId) {
    id
    title
    stageContainers {
      version
      stages {
        id
        title
        languageVersion
        language
        testFramework
        forkBlockNumber
        solutions {
          codeFileId
          code
        }
        codeFiles {
          id
          name
          hasProgress
          executable
          executablePath
          readOnly
          testFixture
          initialCode
        }
      }
    }
	}
}`;

module.exports = { stageContainerGroupIds, stageContainerGroupsByIds }
