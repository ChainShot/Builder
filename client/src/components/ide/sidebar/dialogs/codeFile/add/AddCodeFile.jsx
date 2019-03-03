import React, { Component } from 'react';
import Dialog from 'components/Dialog';
import './AddCodeFile.scss';
import PaneSwitch from 'components/forms/PaneSwitch';
import NewCodeFile from './NewCodeFile';
import ExistingCodeFile from './ExistingCodeFile';

class AddCodeFile extends Component {
  render() {
    const { stageContainer, stage } = this.props;
    return (
      <Dialog title="Add Code File" className="add-codefile">
        <PaneSwitch
          labels={['New File', 'Existing File']}>
          <NewCodeFile stageContainer={stageContainer} stage={stage}/>
          <ExistingCodeFile stageContainer={stageContainer} stage={stage}/>
        </PaneSwitch>
      </Dialog>
    );
  }
}

export default AddCodeFile;
