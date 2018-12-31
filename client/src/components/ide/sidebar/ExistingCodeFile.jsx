import React, { Component } from 'react';
import { close } from '../../../utils/dialog';
import apiMutation from '../../../utils/api/mutation';
import StyledSelect from '../../forms/StyledSelect';
import './ExistingCodeFile.scss';

const mutation = `
mutation modifyCodeFile($codeFileId: String, $codeStageIds: [String], $stageId: String, $codeFileIds: [String]) {
  modifyCodeFile(id: $codeFileId, codeStageIds: $codeStageIds) {
    id
    codeStageIds
  }
  modifyStage(id: $stageId, codeFileIds: $codeFileIds) {
    id
    codeFileIds
  }
}
`

class ExistingCodeFile extends Component {
  constructor(props) {
    super(props);
    const { stage, stageContainer: { stages } } = props;
    const uniqueCodeFiles = stages.reduce((codeFiles, curStage) => {
      curStage.codeFiles.forEach(cf => {
        const alreadyAccumulated = !!codeFiles.find(x => x.id === cf.id);
        const alreadyInStage = !!stage.codeFiles.find(x => x.id === cf.id)
        if(!alreadyAccumulated && !alreadyInStage) {
          codeFiles.push(cf);
        }
      });
      return codeFiles;
    }, []).sort((a,b) => a.name.localeCompare(b.name));
    const options = uniqueCodeFiles.map((codeFile) => ({
      label: codeFile.name,
      value: codeFile
    }))
    this.state = { codeFile: null, options }
  }
  onSubmit() {
    const { stage } = this.props;
    const { codeFileIds } = stage;
    const { codeFile } = this.state;
    const { codeStageIds, id } = codeFile;
    const variables = {
      codeFileId: id,
      codeStageIds: codeStageIds.concat(stage.id),
      stageId: stage.id,
      codeFileIds: codeFileIds.concat(id),
    };
    apiMutation(mutation, variables).then(() => {
      close();
    });
  }
  handleChange(prop, value) {
    this.setState({ [prop]: value });
  }
  render() {
    const { codeFile, options } = this.state;
    return (
      <div className="existing-code-file">
        <StyledSelect
          label="Existing Code File"
          onChange={(val) => this.handleChange("codeFile", val)}
          value={codeFile}
          options={options} />

        <div className="actions">
          <div className="submit" onClick={() => this.onSubmit()}>
            Add Existing Code File
          </div>
        </div>
      </div>
    )
  }
}

export default ExistingCodeFile;
