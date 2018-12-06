import React, { Component } from 'react';
import Dialog from '../../Dialog';
import './AddCodeFile.scss';
import StyledSwitch from '../../forms/StyledSwitch';
import NewCodeFile from './NewCodeFile';
import ExistingCodeFile from './ExistingCodeFile';

class AddCodeFile extends Component {
  state = {
    existing: false,
  }
  handleChange(prop, value) {
    this.setState({ [prop]: value });
  }
  render() {
    const { existing } = this.state;
    const { stageContainer, stage } = this.props;
    const BodyComponent = existing ? ExistingCodeFile : NewCodeFile;
    return (
      <Dialog name="Add Code File" className="add-codefile">
        <form>
          <StyledSwitch
            label="Add Existing Code File?"
            checked={existing}
            onChange={(x) => this.handleChange('existing', x)} />

          <div className="content-body">
            <BodyComponent stageContainer={stageContainer} stage={stage}/>
          </div>
        </form>
      </Dialog>
    );
  }
}

export default AddCodeFile;
