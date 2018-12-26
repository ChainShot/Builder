import React, { Component } from 'react';
import Dialog from '../../Dialog';
import { close } from '../../../utils/dialog';
import './AddStage.scss';
import apiMutation from '../../../utils/api/mutation';
import StyledSelect from '../../forms/StyledSelect';

const mutation = `
mutation createStage($title: String, $containerId: String) {
  createStage(title: $title, containerId: $containerId, details: "", task: "", abiValidations: "") {
    id
    title
    containerId
  }
}
`;

const templates = [
    { label: 'Solidity Stage', value: 'Solidity' },
    { label: 'Vyper Stage', value: 'Vyper' },
    { label: 'Web3 JS Stage', value: 'Web3 JS' },
]

class NewStageTemplate extends Component {
  state = {
    template: "",
    title: ""
  }
  onSubmit = (evt) => {
    evt.preventDefault();
    const { containerId } = this.props;
    const { title } = this.state;
    apiMutation(mutation, { title, containerId }).then(() => {
      close();
    });
  }
  handleChange(prop, value) {
    this.setState({ [prop]: value });
  }
  render() {
    const { template, title } = this.state;
    return (
      <React.Fragment>
        <StyledSelect
          label="Stage Template"
          onChange={(val) => this.handleChange("template", val)}
          value={template}
          options={templates} />

        <div className="actions">
          <div className="submit" onClick={this.onSubmit}>
            Add Stage Template
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewStageTemplate;
