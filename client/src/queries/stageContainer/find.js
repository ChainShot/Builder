import allFields from 'fragments/stageContainer/allFields';

export default `
${allFields}
query findStageContainer($id: String) {
  stageContainer(id: $id) {
    ...allFields
	}
}
`
