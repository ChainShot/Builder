export default `
mutation createStageContainer($stageContainerGroupId: String) {
  createStageContainer(stageContainerGroupId: $stageContainerGroupId) {
    id
  }
}
`
