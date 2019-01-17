import React, { Component } from 'react';
import apiMutation from '../../../utils/api/mutation';
import confirm from '../../../utils/confirm';
import './CodeFileConfig.scss';
import StyledSwitch from '../../forms/StyledSwitch';
import StyledSelect from '../../forms/StyledSelect';
import Help from '../../Help';
import SVG from '../../SVG';

const NAME_HINT = 'Identifies this file to the user';
const EXECUTION_PATH_HINT = 'Determines where this code runs';
const FILE_LOCATION_HINT = 'Where this file exports into a project skeleton';
const MONACO_MODE_HINT = 'The language mode for the code editor';
const VISIBLE_HINT = 'If not visible, it wont display for the user';
const EXECUTABLE_HINT = 'Should this code execute when the user runs their code?';
const USER_PROGRESS_HINT = 'Should ChainShot save users progress on this file?';
const READ_ONLY_HINT = 'Can a user change this file?';
const TEST_FILE_HINT = 'Does this file contain test assertions?';

const modeOptions = [
  { label: 'Solidity', value: 'sol' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Vyper', value: 'python' },
  { label: 'JSON', value: 'json' },
]

const variables = [
  ['id', 'String'],
  ['name', 'String'],
  ['mode', 'String'],
  ['fileLocation', 'String'],
  ['executablePath', 'String'],
  ['readOnly', 'Boolean'],
  ['hasProgress', 'Boolean'],
  ['executable', 'Boolean'],
  ['testFixture', 'Boolean'],
  ['visible', 'Boolean'],
]

const args = variables.map(([prop, type]) => `$${prop}: ${type}`).join(', ');
const mapping = variables.map(([prop, type]) => `${prop}: $${prop}`).join(', ');
const returns = variables.map(([prop]) => `${prop}`).join('\n    ');

const mutation = `
mutation modifyCodeFile(${args}) {
  modifyCodeFile(${mapping}) {
    ${returns}
  }
}
`

const deleteMutation = `
mutation deleteCodeFile($id: String) {
  deleteCodeFile(id: $id) {
    id
  }
}
`

class CodeFileConfig extends Component {
  constructor(props) {
    super(props);
    this.props.onSave(({codeFile}) => apiMutation(mutation, codeFile));
  }
  destroy = () => {
    const { id } = this.props.codeFile;
    confirm("Are you sure you want to delete this Code File?").then(() => {
      apiMutation(deleteMutation, { id }).then(() => {
        const { match: { url } } = this.props;
        this.props.history.push(url.split('/').slice(0, -3).join('/'));
      });
    });
  }
  render() {
    const {
      update,
      codeFile: { name, mode, executablePath, fileLocation, readOnly, hasProgress, executable, testFixture, visible }
    } = this.props;
    const updateCodeFile = (state) => update({ codeFile: state })
    return (
      <form className="config" ref="container">
        <label>
          <Help hint={NAME_HINT}> Name </Help>
          <input
            type="text" className="styled" value={name}
            onChange={({ target: { value }}) => updateCodeFile({ name: value })}/>
        </label>

        <label>
          <Help hint={EXECUTION_PATH_HINT}> Execution Path </Help>
          <input
            type="text" className="styled" value={executablePath}
            onChange={({ target: { value }}) => updateCodeFile({ executablePath: value })}/>
        </label>

        <label>
          <Help hint={FILE_LOCATION_HINT}> File Location </Help>
          <input
            type="text" className="styled" value={fileLocation}
            onChange={({ target: { value }}) => updateCodeFile({ fileLocation: value })}/>
        </label>

        <StyledSelect
          label="Editor Mode"
          hint={MONACO_MODE_HINT}
          onChange={(mode) => updateCodeFile({ mode })}
          value={mode}
          options={modeOptions} />

        <StyledSwitch
          onChange={(visible) => updateCodeFile({ visible })}
          hint={VISIBLE_HINT}
          label="Visible to Users?"
          checked={visible} />

        <StyledSwitch
          onChange={(executable) => updateCodeFile({ executable })}
          hint={EXECUTABLE_HINT}
          label="Executable?"
          checked={executable} />

        <StyledSwitch
          onChange={(hasProgress) => updateCodeFile({ hasProgress })}
          hint={USER_PROGRESS_HINT}
          label="Mantain User Progress?"
          checked={hasProgress} />

        <StyledSwitch
          onChange={(readOnly) => updateCodeFile({ readOnly })}
          hint={READ_ONLY_HINT}
          label="Read Only?"
          checked={readOnly} />

        <StyledSwitch
          onChange={(testFixture) => updateCodeFile({ testFixture })}
          hint={TEST_FILE_HINT}
          label="Test File?"
          checked={testFixture} />

        <div className="btn btn-primary" onClick={this.destroy}>
          <SVG name="trash" />
          Destroy { name }
        </div>
      </form>
    )
  }
}

export default CodeFileConfig;
