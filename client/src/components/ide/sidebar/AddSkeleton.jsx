import React, { Component } from 'react';
import Dialog from '../../Dialog';
import './AddSkeleton.scss';
import { close } from '../../../utils/dialog';
import apiMutation from '../../../utils/api/mutation';

const mutation = `
mutation modifyStage($id: String, $projectSkeletons: [ProjectSkeletonInput]) {
  modifyStage(id: $id, projectSkeletons: $projectSkeletons) {
    id
    projectSkeletons {
      id
      ghNodeId
      ghRepoId
      title
      description
      thumbnailUrl
      zipName
    }
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
    const newStage = { ...stage }
    newStage.projectSkeletons.push({
      title,
      description: "",
      thumbnailUrl: "",
      zipName: "",
    });
    apiMutation(mutation, newStage).then(() => {
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
