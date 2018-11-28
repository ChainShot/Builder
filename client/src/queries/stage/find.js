import mainFields from '../../fragments/codeFile/mainFields';

export default `
query findStage($id: String) {
  stage(id: $id) {
    ...mainFields
    codeFiles {
      id
      name
      executable
      executablePath
      fileLocation
      hasProgress
      mode
      readOnly
      testFixture
      visible
      initialCode
    }
  }
}

${mainFields}
`;
