export default `
mutation modifyStage($id: String, $details: String) {
  modifyStage(id: $id, details: $details) {
    id
    details
  }
}
`
