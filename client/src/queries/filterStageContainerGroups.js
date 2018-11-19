export default `
query ($filter: String) {
  stageContainerGroups(filter: $filter) {
    id
    containerType
    description
    title
	}
}
`
