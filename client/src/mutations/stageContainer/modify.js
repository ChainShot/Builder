export default `
mutation modifyStageContainer($id: String, $intro: String) {
  modifyStageContainer(id: $id, intro: $intro) {
    id
    intro
  }
}
`
