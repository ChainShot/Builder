export default `
fragment allFields on StageContainer {
  id
  version
  type
  intro
  stageContainerGroup {
    id
    containerType
    description
    productionReady
    thumbnailUrl
    estimatedTime
    title
    badgeTypes {
      id
      badgeLimit
      description
      name
      thumbnailUrl
    }
  }
  stages {
    id
    title
    type
    details
    completionMessage
    codeFileIds
    task
    language
    position
    languageVersion
    forkBlockNumber
    testFramework
    youtubeId
    src
    abiValidations
    projectSkeletons {
      id
      ghNodeId
      ghRepoId
      title
      description
      thumbnailUrl
      zipName
    }
    solutions {
      id
      codeFileId
      stageId
      code
    }
    codeFiles {
      id
      name
      executable
      executablePath
      fileLocation
      hasProgress
      mode
      readOnly
      testFixture
      visible
      initialCode
      codeStageIds
    }
  }
}
`
