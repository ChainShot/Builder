import React, { Component } from 'react';
import apiMutation from 'utils/api/mutation';
import * as dialog from 'utils/dialog';
import './CodeFileConfig.scss';
import DestroyCodeFile from './DestroyCodeFile';
import StyledSwitch from 'components/forms/StyledSwitch';
import StyledSelect from 'components/forms/StyledSelect';
import StyledInput from 'components/forms/StyledInput';
import SVG from 'components/SVG';
import { closeTabs } from 'redux/actions';
import { connect } from 'react-redux';
import { IDE_TAB_TYPES } from 'config';
import allFields from 'fragments/stageContainer/allFields';

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
${allFields}
mutation modifyCodeFile(${args}) {
  modifyCodeFile(${mapping}) {
    id
    stageContainer {
      ...allFields
    }
  }
}
`

const validators = {
  name: (x) => !!x,
  executablePath: (x) => !!x,
}

const validate = (props) => {
  return Object.keys(props).reduce((errors, prop) => {
    if(validators.hasOwnProperty(prop) && !validators[prop](props[prop])) return errors.concat(prop);
    return errors;
  }, []);
}

class CodeFileConfig extends Component {
  constructor(props) {
    super(props);
    props.onValidate(({codeFile}) => validate(codeFile));
    this.props.onSave(({codeFile}) => apiMutation(mutation, codeFile, true));
  }
  destroy = () => {
    const { stage, codeFile } = this.props;
    dialog.open(DestroyCodeFile, { stage, codeFile }).then(() => {
      this.props.closeTabs({
        stageId: stage.id,
        id: codeFile.id,
      });
    });
  }
  render() {
    const {
      update, errors,
      codeFile: { name, mode, executablePath, fileLocation, readOnly, hasProgress, executable, testFixture, visible }
    } = this.props;
    const updateCodeFile = (state) => update({ codeFile: state })
    return (
      <form className="config" ref="container">
        <StyledInput
          label="name"
          hint={NAME_HINT}
          type="text"
          errors={errors}
          field="name"
          value={name}
          onChange={({ target: { value }}) => updateCodeFile({ name: value })} />

        <StyledInput
          label="Execution Path"
          hint={EXECUTION_PATH_HINT}
          type="text"
          errors={errors}
          field="executablePath"
          value={executablePath}
          onChange={({ target: { value }}) => updateCodeFile({ executablePath: value })} />

        <StyledInput
          label="File Location"
          hint={FILE_LOCATION_HINT}
          type="text"
          errors={errors}
          field="fileLocation"
          value={fileLocation}
          onChange={({ target: { value }}) => updateCodeFile({ fileLocation: value })} />

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

const mapDispatchToProps = { closeTabs }

export default connect(
  null,
  mapDispatchToProps,
)(CodeFileConfig);
