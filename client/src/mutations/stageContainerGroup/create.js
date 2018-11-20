export default `
mutation createStageContainerGroup($containerType: String) {
  createStageContainerGroup(containerType: $containerType) {
    id
    containerType
  }
}
`
