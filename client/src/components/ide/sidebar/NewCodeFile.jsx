import React, { Component } from 'react';
import { close } from '../../../utils/dialog';
import apiMutation from '../../../utils/api/mutation';
import StyledSwitch from '../../forms/StyledSwitch';

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

class NewCodeFile extends Component {
  state = {
    name: "",
    testFixture: false,
  }
  onSubmit() {
    const { stage, stageContainer } = this.props;
    const { language } = stage;
    const { name, testFixture } = this.state;
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
  handleChange(prop, value) {
    this.setState({[prop]: value});
  }
  render() {
    const { name, testFixture } = this.state;
    return (
      <React.Fragment>
        <label>
          <span>Name</span>
          <input value={name} onChange={({ target }) => this.handleChange('name', target.value)}/>
        </label>

        <StyledSwitch
          onChange={(x) => this.handleChange('testFixture', x)}
          label="Test File?"
          checked={testFixture} />

        <div className="actions">
          <div className="submit" onClick={() => this.onSubmit()}>
            Add New Code File
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default NewCodeFile;
