export default `
query findcodeFile($id: String) {
  codeFile(id: $id) {
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
`
