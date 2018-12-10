export default `
mutation modifySolution($id: String, $code: String) {
  modifySolution(id: $id, code: $code) {
    id
    code
  }
}
`
