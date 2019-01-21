import React, { Component } from 'react';
import { close } from '../../../utils/dialog';
import apiMutation from '../../../utils/api/mutation';
import StyledSwitch from '../../forms/StyledSwitch';
import StyledInput from '../../forms/StyledInput';

const mutation = `
mutation createCodeFile($name: String, $testFixture: Boolean, $executablePath: String, $stageContainerId: String, $codeStageIds: [String]) {
  createCodeFile(name: $name, testFixture: $testFixture, executablePath: $executablePath, stageContainerId: $stageContainerId, codeStageIds: $codeStageIds) {
    id
    name
    executablePath
    stageContainerId
    testFixture
    codeStageIds
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
    const variables = {
      name,
      stageContainerId: stageContainer.id,
      codeStageIds: [stage.id],
      testFixture,
      executablePath
    }
    apiMutation(mutation, variables).then(() => {
      close();
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
