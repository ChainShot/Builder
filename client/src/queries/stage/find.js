export default `
query findStage($id: String) {
  stage(id: $id) {
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
`
