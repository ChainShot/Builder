export default `
query filterStageContainerGroups($filter: String) {
  stageContainerGroups(filter: $filter) {
    id
    containerType
    description
    title
	}
}
`
