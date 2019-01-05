import React, { Component } from 'react';
import Dialog from '../../Dialog';
import './UpdateGithub.scss';
import axios from 'axios';
import { close } from '../../../utils/dialog';

class UpdateGithub extends Component {
  constructor(props) {
    super(props);
    const { owner, name, ghRepoId, ghNodeId } = this.props;
    this.state = {
      owner, name, ghRepoId, ghNodeId,
    }
  }
  onSubmit = async (evt) => {
    evt && evt.preventDefault();
    const { owner, name } = this.state;
    const { data } = await axios.get(`https://api.github.com/repos/${owner}/${name}`);
    close({
      ghRepoId: data.id,
      ghNodeId: data.node_id,
    })
  }
  handleChange(prop, value) {
    this.setState({[prop]: value});
  }
  render() {
    const { owner, name } = this.state;
    return (
      <Dialog title="Update Skeleton Github" className="update-github">
        <form>
          <label>
            <span>Repository Owner</span>
            <input type="text" className="styled" value={owner}
              onChange={({ target }) => this.handleChange('owner', target.value)}/>
          </label>

          <label>
            <span>Repository Name</span>
            <input type="text" className="styled" value={name}
              onChange={({ target }) => this.handleChange('name', target.value)}/>
          </label>

          <div className="actions">
            <div className="btn btn-primary" onClick={() => this.onSubmit()}>
              Update Github
            </div>
          </div>
        </form>
      </Dialog>
    );
  }
}

export default UpdateGithub;
