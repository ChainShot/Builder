import React, { Component } from 'react';
import { close } from '../../../utils/dialog';
import apiMutation from '../../../utils/api/mutation';

const mutation = `
mutation createCodeFile($name: String, $containerId: String) {
  createCodeFile(name: $name, containerId: $containerId, details: "", task: "", abiValidations: "") {
    id
    name
    containerId
  }
}
`;

class NewCodeFile extends Component {
  state = {
    name: "",
  }
  onSubmit() {
    const { containerId } = this.props;
    const { name } = this.state;
    apiMutation(mutation, { name, containerId }).then(() => {
      close();
    });
  }
  render() {
    const { name } = this.state;
    return (
      <div className="body">
        <label>
          Name
          <input value={name} onChange={(...args) => this.handleChange('name', ...args)}/>
        </label>

        <div className="actions">
          <div className="submit" onClick={() => this.onSubmit()}>
            Add New Code File
          </div>
        </div>
      </div>
    )
  }
}

export default NewCodeFile;
