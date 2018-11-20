export default `
query findStageContainer($id: String) {
  stageContainer(id: $id) {
    id
    version
    stages {
      id
      title
      details
      task
      abiValidations
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
      }
    }
	}
}
`
