import React, { Component } from 'react';
import { close } from '../../../utils/dialog';
import apiMutation from '../../../utils/api/mutation';
import StyledSwitch from '../../forms/StyledSwitch';
import StyledInput from '../../forms/StyledInput';

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

const validators = {
  name: (x) => !!x,
}

const validate = (props) => {
  return Object.keys(props).reduce((errors, prop) => {
    if(validators.hasOwnProperty(prop) && !validators[prop](props[prop])) return errors.concat(prop);
    return errors;
  }, []);
}

class NewCodeFile extends Component {
  state = {
    name: "",
    testFixture: false,
    errors: [],
  }
  onSubmit = (evt) => {
    evt && evt.preventDefault();
    const { name, testFixture, errors } = this.state;
    if(errors.length > 0) return;
    const { stage, stageContainer } = this.props;
    const { language } = stage;
    let executablePath = name;
    if(testFixture) {
      executablePath = `test/${name}`;
    }
    else if(language === 'solidity' || language === 'vyper') {
      executablePath = `contracts/${name}`;
    }
    const [extension] = name.split('.').slice(-1);
    let mode = "";
    if(EXTENSIONS_TO_MODE[extension]) {
      mode = EXTENSIONS_TO_MODE[extension];
    }
    const variables = {
      name,
      stageContainerId: stageContainer.id,
      codeStageIds: [stage.id],
      testFixture,
      executablePath,
      mode,
      executable: true,
      visible: true,
      readOnly: testFixture,
      hasProgress: !testFixture,
    }
    apiMutation(mutation, variables).then(({ id }) => {
      close(id);
    });
  }
  validate() {
    const { name, testFixture } = this.state;
    const errors = validate({ name, testFixture });
    this.setState({ errors });
  }
  componentDidMount() {
    this.validate();
  }
  handleChange(prop, value) {
    this.setState({ [prop]: value }, this.validate);
  }
  render() {
    const { name, testFixture, errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <StyledInput
          label="Name"
          type="text"
          value={name}
          errors={errors}
          field="name"
          onChange={({ target }) => this.handleChange('name', target.value)}/>

        <StyledSwitch
          onChange={(x) => this.handleChange('testFixture', x)}
          label="Test File?"
          checked={testFixture} />

        <Actions
          onSubmit={this.onSubmit}
          errors={errors} />
      </form>
    )
  }
}

class Actions extends Component {
  render() {
    const { onSubmit, errors } = this.props;
    const submitClasses = ['btn btn-primary'];
    if(errors.length > 0) {
      submitClasses.push('disabled')
    }
    return (
      <div className="actions">
        <div className={submitClasses.join(' ')} onClick={onSubmit}>
          Add New Code File
        </div>
      </div>
    )
  }
}

export default NewCodeFile;
