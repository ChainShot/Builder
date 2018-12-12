export default `
mutation destroyStage($id: String) {
  destroyStage(id: $id) {
    id
  }
}
`
