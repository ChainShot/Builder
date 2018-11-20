export default `
query findStageContainer($id: String) {
  stageContainer(id: $id) {
    id
    version
	}
}
`
