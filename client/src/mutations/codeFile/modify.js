export default `
mutation modifyCodeFile($id: String, $initialCode: String) {
  modifyCodeFile(id: $id, initialCode: $initialCode) {
    id
    initialCode
  }
}
`
