import React, { Component } from 'react';
import { close } from 'utils/dialog';
import { STAGE_LANGUAGE_OPTIONS, STAGE_TYPE_OPTIONS } from 'config';
import StyledSelect from 'components/forms/StyledSelect';
import apiMutation from 'utils/api/mutation';

const variables = [
  ['title', 'String'],
  ['containerId', 'String'],
  ['type', 'String'],
  ['position', 'Int'],
  ['language', 'String'],
]

const args = variables.map(([prop, type]) => `$${prop}: ${type}`).join(', ');
const mapping = variables.map(([prop, type]) => `${prop}: $${prop}`).join(', ');
const returns = variables.map(([prop]) => `${prop}`).join('\n    ');

const mutation = `
mutation createStage(${args}) {
  createStage(${mapping}, details: "", task: "", abiValidations: "", completionMessage: "") {
    id
    ${returns}
  }
}
`;

const validators = {
  type: (x) => !!x,
  language: (x) => !!x,
}

const validate = (props) => {
  return Object.keys(props).reduce((errors, prop) => {
    if(validators.hasOwnProperty(prop) && !validators[prop](props[prop])) return errors.concat(prop);
    return errors;
  }, []);
}

class NewStage extends Component {
  state = {
    type: null,
    language: null,
    errors: [],
  }
  onSubmit = (evt) => {
    evt && evt.preventDefault();
    const errors = this.allErrors();
    if(errors.length > 0) return;

    const { containerId, title, position } = this.props;
    const { type, language } = this.state;
    apiMutation(mutation, { position, title, containerId, type, language }).then(() => {
      close();
    });
  }
  validate() {
    const { type, language } = this.state;
    const errors = validate({ type, language });
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
    const { type, language } = this.state;
    const errors = this.allErrors();
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

        <Actions
          onSubmit={this.onSubmit}
          errors={errors} />
      </form>
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
          Add New Stage
        </div>
      </div>
    )
  }
}

export default NewStage;
