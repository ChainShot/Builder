import React, { Component } from 'react';
import Dialog from '../../Dialog';
import './AddSkeleton.scss';
import { close } from '../../../utils/dialog';
import apiMutation from '../../../utils/api/mutation';

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
mutation modifyStage(${args}) {
  modifyStage(${mapping}, details: "", task: "", abiValidations: "") {
    id
    ${returns}
  }
}
`;

class AddSkeleton extends Component {
  state = {
    title: ""
  }
  onSubmit(evt) {
    evt && evt.preventDefault();
    const { stage } = this.props;
    const { title } = this.state;
    apiMutation(mutation, variables).then(() => {
      close();
    });
  }
  handleChange(prop, value) {
    this.setState({[prop]: value});
  }
  render() {
    const { stage } = this.props;
    const { title } = this.state;
    return (
      <Dialog title="Add Project Skeleton" className="add-skeleton">
        <form>
          <label>
            <span>Title</span>
            <input type="text" className="styled" value={title}
              onChange={({ target }) => this.handleChange('title', target.value)}/>
          </label>

          <div className="actions">
            <div className="submit" onClick={() => this.onSubmit()}>
              Add Project Skeleton
            </div>
          </div>
        </form>
      </Dialog>
    );
  }
}

export default AddSkeleton;
