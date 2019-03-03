import React, { Component } from 'react';
import { close } from 'utils/dialog';
import apiMutation from 'utils/api/mutation';
import StyledSelect from 'components/forms/StyledSelect';
import './NewStageTemplate.scss';
import allFields from 'fragments/stageContainer/allFields';

const variables = [
  ['title', 'String'],
  ['containerId', 'String'],
  ['template', 'String'],
  ['position', 'Int'],
]

const args = variables.map(([prop, type]) => `$${prop}: ${type}`).join(', ');
const mapping = variables.map(([prop, type]) => `${prop}: $${prop}`).join(', ');

const mutation = `
${allFields}
mutation createStage(${args}) {
  createStage(${mapping}, details: "", task: "", abiValidations: "",  completionMessage: "") {
    id
    stageContainer {
      ...allFields
    }
  }
}
`;

const templates = [
    { label: 'Solidity Stage', value: 'solidity' },
    { label: 'Vyper Stage', value: 'vyper' },
    { label: 'Web3 JS Stage', value: 'web3' },
]

const validators = {
  template: (x) => !!x,
}

const validate = (props) => {
  return Object.keys(props).reduce((errors, prop) => {
    if(validators.hasOwnProperty(prop) && !validators[prop](props[prop])) return errors.concat(prop);
    return errors;
  }, []);
}

class NewStageTemplate extends Component {
  state = {
    template: "",
    errors: [],
  }
  onSubmit = (evt) => {
    evt && evt.preventDefault();
    const errors = this.allErrors();
    if(errors.length > 0) return;

    const { containerId, title, position } = this.props;
    const { template } = this.state;
    apiMutation(mutation, { title, containerId, template, position }, true).then(({ id }) => {
      close(id);
    });
  }
  validate() {
    const { template } = this.state;
    const errors = validate({ template });
    this.setState({ errors });
  }
  componentDidMount() {
    this.validate();
  }
  handleChange(prop, value) {
    this.setState({ [prop]: value }, this.validate);
  }
  allErrors() {
    return this.state.errors.concat(this.props.errors);
  }
  render() {
    const { template } = this.state;
    const errors = this.allErrors();
    return (
      <div className="new-stage-template">
        <StyledSelect
          label="Stage Template"
          onChange={(val) => this.handleChange("template", val)}
          value={template}
          options={templates} />

        <Actions
          onSubmit={this.onSubmit}
          errors={errors} />
      </div>
    );
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
          Add Stage Template
        </div>
      </div>
    )
  }
}

export default NewStageTemplate;
