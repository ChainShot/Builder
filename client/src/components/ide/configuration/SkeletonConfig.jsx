import React, { Component } from 'react';
import StyledSelect from '../../forms/StyledSelect';
import apiMutation from '../../../utils/api/mutation';
import confirm from '../../../utils/confirm';
import SVG from '../../SVG';
import { withRouter } from 'react-router-dom';
import './SkeletonConfig.scss';

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

class SkeletonConfig extends Component {
  constructor(props) {
    super(props);
    props.onSave(({ stage }) => apiMutation(mutation, stage))
  }
  destroySkeleton = () => {
    const { match: { url, params: { skeletonId }} } = this.props;
    confirm("Are you sure you want to delete this skeleton?").then(() => {
      const { stage } = this.props;
      const newStage = { ...stage }
      newStage.projectSkeletons = newStage.projectSkeletons.filter(x => x.id !== skeletonId);
      apiMutation(mutation, newStage);
      this.props.history.push(url.split('/').slice(0, -2).join('/'));
    });
  }
  render() {
    const { match: { params: { skeletonId }}, update, stage } = this.props;
    const skeleton = stage.projectSkeletons.find(x => x.id === skeletonId);
    const { title, description, thumbnailUrl, zipName } = skeleton;
    const updateSkeleton = (state) => {
      const idx = stage.projectSkeletons.findIndex(x => x.id === skeletonId);
      update({
        stage: {
          ...stage,
          projectSkeletons: [
            ...stage.projectSkeletons.slice(0, idx),
            state,
            ...stage.projectSkeletons.slice(idx + 1),
          ],
        }
      });
    }
    return (
      <form className="config">
        <label>
          <span>Title</span>
          <input type="text" className="styled" value={title}
            onChange={({ target: { value }}) => updateSkeleton({ title: value })}/>
        </label>

        <label>
          <span>Description</span>
          <input type="text" className="styled" value={description}
            onChange={({ target: { value }}) => updateSkeleton({ description: value })}/>
        </label>

        <label>
          <span>Thumbnail URL</span>
          <input type="text" className="styled" value={thumbnailUrl}
            onChange={({ target: { value }}) => updateSkeleton({ thumbnailUrl: value })}/>
        </label>

        <label>
          <span>Zip Name</span>
          <input type="text" className="styled" value={zipName}
            onChange={({ target: { value }}) => updateSkeleton({ zipName: value })}/>
        </label>

        <div className="btn btn-primary" onClick={this.destroySkeleton}>
          <SVG name="trash" />
          Destroy Skeleton
        </div>
      </form>
    )
  }
}

export default withRouter(SkeletonConfig);
