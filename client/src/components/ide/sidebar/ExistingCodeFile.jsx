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

class ExistingCodeFile extends Component {
  render() {
    return <div> Existing </div>
  }
}

export default ExistingCodeFile;
