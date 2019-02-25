import React, { Component } from 'react';
import PaneSwitch from 'components/forms/PaneSwitch';
import ImportFiles from './ImportFiles';
import ImportFolders from './ImportFolders';
import Dialog from 'components/Dialog';

class ImportCodeFiles extends Component {
  render() {
    const { stageContainer, stage } = this.props;
    return (
      <Dialog title="Import Code Files" className="import-code-files">
        <PaneSwitch
          labels={['Import Files', 'Import Folders']}>
          <ImportFiles stageContainer={stageContainer} stage={stage}/>
          <ImportFolders stageContainer={stageContainer} stage={stage}/>
        </PaneSwitch>
      </Dialog>
    )
  }
}

export default ImportCodeFiles;
