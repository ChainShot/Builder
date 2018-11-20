export default `
query findStageContainerGroup($id: String) {
  stageContainerGroup(id: $id) {
    id
    containerType
    description
    title
    stageContainers {
      id
      version
    }
	}
}
`
