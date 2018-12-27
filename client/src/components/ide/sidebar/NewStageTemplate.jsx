import React, { Component } from 'react';
import { close } from '../../../utils/dialog';
import './AddStage.scss';
import apiMutation from '../../../utils/api/mutation';
import StyledSelect from '../../forms/StyledSelect';

const variables = [
  ['title', 'String'],
  ['containerId', 'String'],
  ['template', 'String'],
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
    const { containerId, title } = this.props;
    const { template } = this.state;
    apiMutation(mutation, { title, containerId, template }).then(() => {
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
