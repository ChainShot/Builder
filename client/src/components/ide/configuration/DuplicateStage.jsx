import React, { Component } from 'react';
import Dialog from '../../Dialog';
import { close } from '../../../utils/dialog';
import apiMutation from '../../../utils/api/mutation';

const variables = [
  ['id', 'String'],
  ['title', 'String'],
  ['position', 'Int'],
]

const args = variables.map(([prop, type]) => `$${prop}: ${type}`).join(', ');
const mapping = variables.map(([prop, type]) => `${prop}: $${prop}`).join(', ');
const returns = variables.map(([prop]) => `${prop}`).join('\n    ');

const mutation = `
mutation duplicateStage(${args}) {
  duplicateStage(${mapping}) {
    ${returns}
  }
}
`;

class DuplicateStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: `${props.title} (copy)`,
      position: props.position + 1,
    }
  }
  onSubmit = async (evt) => {
    evt && evt.preventDefault();
    const { id } = this.props;
    const { title, position } = this.state;
    apiMutation(mutation, { id, title, position }).then(({ id }) => {
      close(id);
    });
  }
  handleChange(prop, value) {
    this.setState({[prop]: value});
  }
  render() {
    const { title, position } = this.state;
    return (
      <Dialog title="Duplicate Stage" className="duplicate-stage">
        <form onSubmit={this.onSubmit}>
          <label>
            <span>Title</span>
            <input type="text" className="styled" value={title}
              onChange={({ target }) => this.handleChange('title', target.value)}/>
          </label>

          <label>
            <span>Position</span>
            <input type="text" className="styled" value={position}
              onChange={({ target }) => this.handleChange('position', target.value)}/>
          </label>

          <div className="actions">
            <div className="btn btn-primary" onClick={this.onSubmit}>
              Create Duplicate
            </div>
          </div>
        </form>
      </Dialog>
    );
  }
}

export default DuplicateStage;
