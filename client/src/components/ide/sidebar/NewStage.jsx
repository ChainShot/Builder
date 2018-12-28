import React, { Component } from 'react';
import Dialog from '../../Dialog';
import { close } from '../../../utils/dialog';
import { STAGE_LANGUAGE_OPTIONS, STAGE_TYPE_OPTIONS } from '../../../config';
import StyledSelect from '../../forms/StyledSelect';
import apiMutation from '../../../utils/api/mutation';

const variables = [
  ['title', 'String'],
  ['containerId', 'String'],
  ['type', 'String'],
  ['language', 'String'],
]

const args = variables.map(([prop, type]) => `$${prop}: ${type}`).join(', ');
const mapping = variables.map(([prop, type]) => `${prop}: $${prop}`).join(', ');
const returns = variables.map(([prop]) => `${prop}`).join('\n    ');

const mutation = `
mutation createStage(${args}) {
  createStage(${mapping}, details: "", task: "", abiValidations: "") {
    id
    ${returns}
  }
}
`;

class NewStage extends Component {
  state = {
    type: null,
    language: null,
  }
  onSubmit = (evt) => {
    evt.preventDefault();
    const { containerId, title } = this.props;
    const { type, language } = this.state;
    apiMutation(mutation, { title, containerId, type, language }).then(() => {
      close();
    });
  }
  handleChange(prop, val) {
    this.setState({[prop]: val});
  }
  render() {
    const { title } = this.props;
    const { type, language } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <StyledSelect
          label="Type"
          onChange={(val) => this.handleChange("type", val)}
          value={type}
          options={STAGE_TYPE_OPTIONS} />

        <StyledSelect
          label="Language"
          onChange={(val) => this.handleChange("language", val)}
          value={language}
          options={STAGE_LANGUAGE_OPTIONS} />

        <div className="actions">
          <div className="submit" onClick={this.onSubmit}>
            Add New Stage
          </div>
        </div>
      </form>
    );
  }
}

export default NewStage;
