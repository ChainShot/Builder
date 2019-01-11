import React, { Component } from 'react';
import apiMutation from '../../../utils/api/mutation';
import confirm from '../../../utils/confirm';
import * as dialog from '../../../utils/dialog';
import UpdateGithub from './UpdateGithub';
import SVG from '../../SVG';
import axios from 'axios';
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
  getSkeleton() {
    const { match: { params: { skeletonId }}, stage } = this.props;
    return stage.projectSkeletons.find(x => x.id === skeletonId);
  }
  updateGithub = async () => {
    const { ghRepoId, ghNodeId } = this.getSkeleton();
    const params = {ghRepoId, ghNodeId, owner: "", name: ""};
    try {
      if(ghRepoId) {
        const { data } = await axios.get(`https://api.github.com/repositories/${ghRepoId}`);
        params.owner = data.owner.login;
        params.name = data.name;
      }
    }
    catch(ex) {
      console.error(`Repo ID ${ghRepoId} not found`);
    }
    dialog.open(UpdateGithub, params).then((state) => {
      if(state) {
        this.updateSkeleton(state);
      }
    });
  }
  updateSkeleton = (state) => {
    const { update, stage, match: { params: { skeletonId }} } = this.props;
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
  render() {
    const { title, description, thumbnailUrl, zipName, ghRepoId, ghNodeId } = this.getSkeleton();
    return (
      <form className="config skeleton">
        <label>
          <span>Title</span>
          <input type="text" className="styled" value={title}
            onChange={({ target: { value }}) => this.updateSkeleton({ title: value })}/>
        </label>

        <label>
          <span>Description</span>
          <input type="text" className="styled" value={description}
            onChange={({ target: { value }}) => this.updateSkeleton({ description: value })}/>
        </label>

        <label>
          <span>Thumbnail URL</span>
          <input type="text" className="styled" value={thumbnailUrl}
            onChange={({ target: { value }}) => this.updateSkeleton({ thumbnailUrl: value })}/>
        </label>

        <label>
          <span>Zip Name</span>
          <input type="text" className="styled" value={zipName}
            onChange={({ target: { value }}) => this.updateSkeleton({ zipName: value })}/>
        </label>

        <div className="btn btn-primary" onClick={this.updateGithub}>
          <SVG name="octocat" />
          Update Github Repo
        </div>

        <label>
          <span>Github Repo ID</span>
          <input type="text" disabled className="styled" value={ghRepoId}/>
        </label>

        <label>
          <span>Github Node ID</span>
          <input type="text" disabled className="styled" value={ghNodeId}/>
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
