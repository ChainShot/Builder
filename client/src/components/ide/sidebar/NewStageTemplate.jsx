import React, { Component } from 'react';
import { close } from '../../../utils/dialog';
import apiMutation from '../../../utils/api/mutation';
import StyledSelect from '../../forms/StyledSelect';
import './NewStageTemplate.scss';

const variables = [
  ['title', 'String'],
  ['containerId', 'String'],
  ['template', 'String'],
  ['position', 'Int'],
]

const args = variables.map(([prop, type]) => `$${prop}: ${type}`).join(', ');
const mapping = variables.map(([prop, type]) => `${prop}: $${prop}`).join(', ');

const mutation = `
mutation createStage(${args}) {
  createStage(${mapping}, details: "", task: "", abiValidations: "") {
    id
  }
}
`;

const templates = [
    { label: 'Solidity Stage', value: 'solidity' },
    { label: 'Vyper Stage', value: 'vyper' },
    { label: 'Web3 JS Stage', value: 'web3' },
]

class NewStageTemplate extends Component {
  state = {
    template: "",
    title: ""
  }
  onSubmit = (evt) => {
    evt.preventDefault();
    const { containerId, title, position } = this.props;
    const { template } = this.state;
    apiMutation(mutation, { title, containerId, template, position }).then(() => {
      close();
    });
  }
  handleChange(prop, value) {
    this.setState({ [prop]: value });
  }
  render() {
    const { template } = this.state;
    return (
      <div className="new-stage-template">
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
      </div>
    );
  }
}

export default NewStageTemplate;
