import React, { Component } from 'react';
import apiMutation from '../../../utils/api/mutation';
import confirm from '../../../utils/confirm';
import './CodeFileConfig.scss';
import StyledSwitch from '../../forms/StyledSwitch';
import StyledSelect from '../../forms/StyledSelect';
import SVG from '../../SVG';

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
      codeFile: { name, mode, executablePath, readOnly, hasProgress, executable, testFixture, visible }
    } = this.props;
    const updateCodeFile = (state) => update({ codeFile: state })
    return (
      <form className="config" ref="container">
        <label>
          <span>Name</span>
          <input
            type="text" className="styled" value={name}
            onChange={({ target: { value }}) => updateCodeFile({ name: value })}/>
        </label>

        <label>
          <span>Execution Path</span>
          <input
            type="text" className="styled" value={executablePath}
            onChange={({ target: { value }}) => updateCodeFile({ executablePath: value })}/>
        </label>

        <StyledSelect
          label="Monaco Mode"
          onChange={(mode) => updateCodeFile({ mode })}
          value={mode}
          options={modeOptions} />

        <StyledSwitch
          onChange={(visible) => updateCodeFile({ visible })}
          label="Visible to Users?"
          checked={visible} />

        <StyledSwitch
          onChange={(executable) => updateCodeFile({ executable })}
          label="Executable?"
          checked={executable} />

        <StyledSwitch
          onChange={(hasProgress) => updateCodeFile({ hasProgress })}
          label="Mantain User Progress?"
          checked={hasProgress} />

        <StyledSwitch
          onChange={(readOnly) => updateCodeFile({ readOnly })}
          label="Read Only?"
          checked={readOnly} />

        <StyledSwitch
          onChange={(testFixture) => updateCodeFile({ testFixture })}
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
