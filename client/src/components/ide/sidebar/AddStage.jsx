import React, { Component } from 'react';
import Dialog from '../../Dialog';
import { close } from '../../../utils/dialog';
import './AddStage.scss';
import apiMutation from '../../../utils/api/mutation';

const mutation = `
mutation createStage($title: String, $containerId: String) {
  createStage(title: $title, containerId: $containerId, details: "", task: "", abiValidations: "") {
    id
    title
    containerId
  }
}
`;

class AddStage extends Component {
  state = {
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
  handleChange(prop, {target}) {
    this.setState({[prop]: target.value});
  }
  render() {
    const { title } = this.state;
    return (
      <Dialog title="New Stage" className="add-stage">
        <form onSubmit={this.onSubmit}>
          <label>
            <span>Title</span>
            <input value={title} onChange={(...args) => this.handleChange('title', ...args)}/>
          </label>
          <div className="actions">
            <div className="submit" onClick={this.onSubmit}>
              Add Stage
            </div>
          </div>
        </form>
      </Dialog>
    );
  }
}

export default AddStage;
