import React, { Component } from 'react';
import Dialog from '../../Dialog';
import { close } from '../../../utils/dialog';
import apiMutation from '../../../utils/api/mutation';
import StyledCheckbox from '../../forms/StyledCheckbox';
import './DestroyCodeFile.scss';

const deleteMutation = `
mutation deleteCodeFile($id: String) {
  deleteCodeFile(id: $id) {
    id
  }
}
`

const removeStageIdMutation = `
mutation modifyCodeFile($codeFileId: String, $codeStageIds: [String], $codeStageId: String, $codeFileIds: [String]) {
  modifyStage(id: $codeStageId, codeFileIds: $codeFileIds) {
    id
  }
  modifyCodeFile(id: $codeFileId, codeStageIds: $codeStageIds) {
    id
  }
}
`

const REMOVE_HINT = "If toggled this will remove this code file for all stages it currently exists in."

class DestroyCodeFile extends Component {
  constructor(props) {
    super(props);
    const { codeFile: { codeStageIds }} = props;
    const multipleStages = codeStageIds.length > 1;
    this.state = {
      removeAll: !multipleStages,
      multipleStages,
    }
  }
  onSubmit = async (evt) => {
    evt && evt.preventDefault();
    const { removeAll } = this.state;
    const { codeFile, stage } = this.props;
    const filteredStages = codeFile.codeStageIds.filter(x => x !== stage.id);
    const filteredCodeFiles = stage.codeFileIds.filter(x => x !== codeFile.id);
    if(removeAll) {
      apiMutation(deleteMutation, {
        id: codeFile.id,
      }).then(({ id }) => {
        close({ removeAll });
      });
    }
    else {
      apiMutation(removeStageIdMutation, {
        codeStageIds: filteredStages,
        codeFileId: codeFile.id,
        codeStageId: stage.id,
        codeFileIds: filteredCodeFiles,
      }).then(({ id }) => {
        close({ removeAll });
      });
    }
  }
  handleChange(prop, value) {
    this.setState({[prop]: value});
  }
  renderOption() {
    const { removeAll, multipleStages } = this.state;
    if(multipleStages) {
      return (
        <StyledCheckbox
          onChange={(removeAll) => this.handleChange('removeAll', removeAll)}
          hint={REMOVE_HINT}
          label="Destroy it everywhere?"
          checked={removeAll} />
      )
    }
    return null;
  }
  render() {
    return (
      <Dialog title="Destroy Code File" className="destroy-code-file">
        <form onSubmit={this.onSubmit}>
          <p>
            Are you sure you want to delete this Code File?
          </p>

          {this.renderOption()}

          <div className="actions">
            <div className="btn btn-primary" onClick={this.onSubmit}>
              Destroy Code File
            </div>
          </div>
        </form>
      </Dialog>
    );
  }
}

export default DestroyCodeFile;
