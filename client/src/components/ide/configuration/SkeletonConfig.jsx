import React, { Component } from 'react';
import apiMutation from 'utils/api/mutation';
import confirm from 'utils/confirm';
import * as dialog from 'utils/dialog';
import UpdateGithub from './UpdateGithub';
import SVG from 'components/SVG';
import axios from 'axios';
import { IDE_TAB_TYPES } from 'config';
import './SkeletonConfig.scss';
import Help from 'components/Help';
import { connect } from 'react-redux';
import { closeTab } from 'redux/actions';

const TITLE_HINT = 'Short name displayed to the user';
const DESCRIPTION_HINT = 'Description of this application';
const ZIP_HINT = 'The name of the zip folder the user will download this into';
const THUMBNAIL_HINT = 'You give us a web URL of an image, we\'ll show it the user';
const GITHUB_REPO_HINT = 'This is an identifier Github assigns its repositories';
const GITHUB_NODE_HINT = 'This is an identifier Github assigns its any entity';

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
    const { skeletonId } = this.props;
    confirm("Are you sure you want to delete this skeleton?").then(() => {
      const { stage } = this.props;
      const newStage = { ...stage }
      newStage.projectSkeletons = newStage.projectSkeletons.filter(x => x.id !== skeletonId);
      apiMutation(mutation, newStage);
      this.props.closeTab({
        stageId: stage.id,
        type: IDE_TAB_TYPES.SKELETON_CONFIG,
        id: skeletonId
      })
    });
  }
  getSkeleton() {
    const { skeletonId, stage } = this.props;
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
    const { update, stage, skeletonId } = this.props;
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
      <div className="skeleton-config">
        <form className="config">
          <label>
            <Help hint={TITLE_HINT}> Title </Help>
            <input type="text" className="styled" value={title}
              onChange={({ target: { value }}) => this.updateSkeleton({ title: value })}/>
          </label>

          <label>
            <Help hint={DESCRIPTION_HINT}> Description </Help>
            <input type="text" className="styled" value={description}
              onChange={({ target: { value }}) => this.updateSkeleton({ description: value })}/>
          </label>

          <label>
            <Help hint={THUMBNAIL_HINT}> Thumbnail URL </Help>
            <input type="text" className="styled" value={thumbnailUrl}
              onChange={({ target: { value }}) => this.updateSkeleton({ thumbnailUrl: value })}/>
          </label>

          <label>
            <Help hint={ZIP_HINT}> Zip Name </Help>
            <input type="text" className="styled" value={zipName}
              onChange={({ target: { value }}) => this.updateSkeleton({ zipName: value })}/>
          </label>

          <div className="btn btn-primary" onClick={this.updateGithub}>
            <SVG name="octocat" />
            Update Github Repo
          </div>

          <label>
            <Help hint={GITHUB_REPO_HINT}> Github Repo ID </Help>
            <input type="text" disabled className="styled" value={ghRepoId}/>
          </label>

          <label>
            <Help hint={GITHUB_NODE_HINT}> Github Node ID </Help>
            <input type="text" disabled className="styled" value={ghNodeId}/>
          </label>

          <div className="btn btn-primary" onClick={this.destroySkeleton}>
            <SVG name="trash" />
            Destroy Skeleton
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = { closeTab }

export default connect(
  null,
  mapDispatchToProps
)(SkeletonConfig);
