import React, { Component } from 'react';
import PaneSwitch from 'components/forms/PaneSwitch';
import ImportFiles from './ImportFiles';
import ImportFolders from './ImportFolders';
import StyledInput from 'components/forms/StyledInput';
import Dialog from 'components/Dialog';

const EXECUTABLE_PATH_HINT = "The base path that your code files will be imported to.";

class ImportCodeFiles extends Component {
  state = {
    executablePath: "",
    files: [],
  }
  onSubmit = () => {

  }
  updateFiles = (files) => {
    this.setState({ files })
  }
  handleChange(prop, value) {
    this.setState({ [prop]: value });
  }
  render() {
    const { executablePath, files } = this.state;
    return (
      <Dialog title="Import Code Files" className="import-code-files">
        <StyledInput
          label="Base File Path"
          type="text"
          value={executablePath}
          hint={EXECUTABLE_PATH_HINT}
          onChange={({ target }) => this.handleChange('executablePath', target.value)}/>

        <PaneSwitch
          labels={['Files', 'Folders']}>
          <ImportFiles
            files={files}
            executablePath={executablePath}
            updateFiles={this.updateFiles}/>
          <ImportFolders
            files={files}
            executablePath={executablePath}
            updateFiles={this.updateFiles}/>
        </PaneSwitch>

        <div className="actions">
          <div className="btn btn-primary" onClick={this.onSubmit}>
            Import CodeFiles
          </div>
        </div>
      </Dialog>
    )
  }
}

export default ImportCodeFiles;
