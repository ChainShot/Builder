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
  handleChange(prop, {target}) {
    this.setState({[prop]: target.value});
  }
  render() {
    const { existing } = this.state;
    const BodyComponent = existing ? ExistingCodeFile : NewCodeFile;
    return (
      <Dialog name="Add Code File" className="add-codefile">
        <StyledSwitch
          label="Add Existing Code File?"
          value={existing}
          onChange={(x) => this.handleChange('existing', x)} />

        <BodyComponent />
      </Dialog>
    );
  }
}

export default AddCodeFile;
