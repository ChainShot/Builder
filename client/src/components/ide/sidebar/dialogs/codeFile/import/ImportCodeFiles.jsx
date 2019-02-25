import React, { Component } from 'react';
import PaneSwitch from 'components/forms/PaneSwitch';
import ImportFiles from './ImportFiles';
import ImportFolders from './ImportFolders';
import StyledInput from 'components/forms/StyledInput';
import Dialog from 'components/Dialog';
import apiMutation from 'utils/api/mutation';
import './ImportCodeFiles.scss';
import { close } from 'utils/dialog';
import path from 'path-posix';

const EXTENSIONS_TO_MODE = {
  js: 'javascript',
  json: 'json',
  sol: 'sol',
  py: 'python',
}

const variables = [
  ['name', 'String'],
  ['stageContainerId', 'String'],
  ['mode', 'String'],
  ['codeStageIds', '[String]'],
  ['executablePath', 'String'],
  ['executable', 'Boolean'],
  ['visible', 'Boolean'],
  ['testFixture', 'Boolean'],
  ['readOnly', 'Boolean'],
  ['hasProgress', 'Boolean'],
]

const args = variables.map(([prop, type]) => `$${prop}: ${type}`).join(', ');
const mapping = variables.map(([prop, type]) => `${prop}: $${prop}`).join(', ');
const returns = variables.map(([prop]) => `${prop}`).join('\n    ');

const mutation = `
mutation createCodeFile(${args}) {
  createCodeFile(${mapping}) {
    id
    ${returns}
  }
}
`;

const BASE_PATH_HINT = "The base path that your code files will be imported to.";

class ImportCodeFiles extends Component {
  state = {
    basePath: "",
    files: [],
  }
  onSubmit = async () => {
    const { files, basePath } = this.state;
    await Promise.all(files.map(({ name, contents }) => {
      const { stage, stageContainer } = this.props;
      const executablePath = path.join(basePath, name);
      const [extension] = name.split('.').slice(-1);
      let mode = "";
      if(EXTENSIONS_TO_MODE[extension]) {
        mode = EXTENSIONS_TO_MODE[extension];
      }
      const variables = {
        name,
        stageContainerId: stageContainer.id,
        codeStageIds: [stage.id],
        executablePath,
        mode,
        initialCode: contents,
        executable: true,
        visible: true,
        readOnly: true,
        hasProgress: false,
        testFixture: false,
      }
      return apiMutation(mutation, variables);
    }));
    close();
  }
  updateFiles = (files) => {
    this.setState({ files })
  }
  handleChange(prop, value) {
    this.setState({ [prop]: value });
  }
  render() {
    const { basePath, files } = this.state;
    return (
      <Dialog title="Import Code Files" className="import-code-files">
        <StyledInput
          label="Base File Path"
          type="text"
          value={basePath}
          hint={BASE_PATH_HINT}
          onChange={({ target }) => this.handleChange('basePath', target.value)}/>

        <PaneSwitch
          labels={['Files', 'Folders']}>
          <ImportFiles
            files={files}
            basePath={basePath}
            updateFiles={this.updateFiles}/>
          <ImportFolders
            files={files}
            basePath={basePath}
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
