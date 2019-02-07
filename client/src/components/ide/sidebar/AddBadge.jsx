import React, { Component } from 'react';
import Dialog from '../../Dialog';
import './AddBadge.scss';
import { close } from '../../../utils/dialog';
import apiMutation from '../../../utils/api/mutation';

const mutation = `
mutation createBadgeType($name: String, $stageContainerGroupId: String) {
  createBadgeType(name: $name, stageContainerGroupId: $stageContainerGroupId, badgeLimit: 0) {
    id
  }
}
`;

class AddBadge extends Component {
  state = {
    name: ""
  }
  onSubmit(evt) {
    evt && evt.preventDefault();
    const { name } = this.state;
    const { stageContainerGroupId } = this.props;
    apiMutation(mutation, { name, stageContainerGroupId }).then((id) => {
      close(id);
    });
  }
  handleChange(prop, value) {
    this.setState({[prop]: value});
  }
  render() {
    const { name } = this.state;
    return (
      <Dialog title="Add Badge" className="add-badge">
        <form>
          <label>
            <span>Name</span>
            <input type="text" className="styled" value={name}
              onChange={({ target }) => this.handleChange('name', target.value)}/>
          </label>

          <div className="actions">
            <div className="btn btn-primary" onClick={() => this.onSubmit()}>
              Add Badge
            </div>
          </div>
        </form>
      </Dialog>
    );
  }
}

export default AddBadge;
