import React, { Component } from 'react';
import Dialog from '../../Dialog';
import './AddCodeFile.scss';
import StyledSwitch from '../../forms/StyledSwitch';
import PaneSwitch from '../../forms/PaneSwitch';
import NewCodeFile from './NewCodeFile';
import ExistingCodeFile from './ExistingCodeFile';

class AddCodeFile extends Component {
  state = {
    existing: false,
  }
  handleChange(prop, value) {
    console.log(prop, value);
    this.setState({ [prop]: value });
  }
  render() {
    const { existing } = this.state;
    const { stageContainer, stage } = this.props;
    const BodyComponent = existing ? ExistingCodeFile : NewCodeFile;
    const options = [
      { value: false, display: 'New File' },
      { value: true, display: 'Existing File' },
    ]
    return (
      <Dialog name="Add Code File" className="add-codefile">
        <form>
          <PaneSwitch
            options={options}
            onChange={(x) => this.handleChange('existing', x)} />

          <BodyComponent stageContainer={stageContainer} stage={stage}/>
        </form>
      </Dialog>
    );
  }
}

export default AddCodeFile;
