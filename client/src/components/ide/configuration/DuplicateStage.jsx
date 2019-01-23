import React, { Component } from 'react';
import Dialog from '../../Dialog';
import { close } from '../../../utils/dialog';
import apiMutation from '../../../utils/api/mutation';
import StyledCheckbox from '../../forms/StyledCheckbox';
import StyledInput from '../../forms/StyledInput';

const variables = [
  ['id', 'String'],
  ['title', 'String'],
  ['position', 'Int'],
  ['createNew', 'Boolean'],
]

const args = variables.map(([prop, type]) => `$${prop}: ${type}`).join(', ');
const mapping = variables.map(([prop, type]) => `${prop}: $${prop}`).join(', ');

const mutation = `
mutation duplicateStage(${args}) {
  duplicateStage(${mapping}) {
    id
  }
}
`;

const TITLE_HINT = 'Short name displayed to the user';
const POSITION_HINT = 'The order of this stage relative to other stages';
const LINKED_CODE_FILE_HINT = "If checked this will create new versions of the code files rather than the existing ones"

const validators = {
  title: (x) => !!x,
  position: (x) => x >= 0,
}

const validate = (props) => {
  return Object.keys(props).reduce((errors, prop) => {
    if(validators.hasOwnProperty(prop) && !validators[prop](props[prop])) return errors.concat(prop);
    return errors;
  }, []);
}

class DuplicateStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: `${props.title} (copy)`,
      position: props.position + 1,
      createNew: false,
      errors: [],
    }
  }
  onSubmit = async (evt) => {
    evt && evt.preventDefault();
    const { title, position, createNew, errors } = this.state;
    if(errors.length > 0) return;
    const { id } = this.props;
    apiMutation(mutation, { id, title, position, createNew }).then(({ id }) => {
      close(id);
    });
  }
  validate() {
    const { title, position } = this.state;
    const errors = validate({ title, position });
    this.setState({ errors });
  }
  componentDidMount() {
    this.validate();
  }
  handleChange(prop, value) {
    this.setState({ [prop]: value }, this.validate);
  }
  renderOption() {
    const { codeFileIds } = this.props;
    const { createNew } = this.state;
    if(codeFileIds && codeFileIds.length > 0) {
      return (
        <StyledCheckbox
          onChange={(createNew) => this.handleChange('createNew', createNew)}
          hint={LINKED_CODE_FILE_HINT}
          label="Re-Create Code Files?"
          checked={createNew} />
      )
    }
    return null;
  }
  render() {
    const { title, position, errors } = this.state;
    return (
      <Dialog title="Duplicate Stage" className="duplicate-stage">
        <form onSubmit={this.onSubmit}>
          <StyledInput
            label="Title"
            hint={TITLE_HINT}
            type="text"
            errors={errors}
            field="title"
            value={title}
            onChange={({ target }) => this.handleChange('title', target.value)} />

          <StyledInput
            label="Position"
            hint={POSITION_HINT}
            type="number"
            errors={errors}
            field="position"
            value={position}
            onChange={({ target }) => this.handleChange('position', +target.value)} />

          {this.renderOption()}

          <Actions
            onSubmit={this.onSubmit}
            errors={errors} />
        </form>
      </Dialog>
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
          Create Duplicate
        </div>
      </div>
    )
  }
}

export default DuplicateStage;
