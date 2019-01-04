import React, { Component } from 'react';
import StyledSelect from '../../forms/StyledSelect';
import apiMutation from '../../../utils/api/mutation';
import confirm from '../../../utils/confirm';
import SVG from '../../SVG';
import './SkeletonConfig.scss';

const variables = [
  ['id', 'String'],
  ['ghNodeId', 'String'],
  ['ghRepoId', 'String'],
  ['title', 'String'],
  ['description', 'String'],
  ['thumbnailUrl', 'String'],
  ['zipName', 'String'],
]

const args = variables.map(([prop, type]) => `$${prop}: ${type}`).join(', ');
const mapping = variables.map(([prop, type]) => `${prop}: $${prop}`).join(', ');
const returns = variables.map(([prop]) => `${prop}`).join('\n    ');

const mutation = `
mutation modifyStage(${args}) {
  modifyStage(${mapping}) {
    ${returns}
  }
}
`
const destroySkeleton = ``// hmm

class SkeletonConfig extends Component {
  constructor(props) {
    super(props);
  }
  destroySkeleton = () => {
    confirm("Are you sure you want to delete this skeleton?").then(() => {
      const { skeletonId } = this.props;
      // probably will want to modify stage with the skeleton removed
      apiMutation(destroySkeleton, { skeletonId });
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
          skeletons: [
            stage.skeletons.slice(0, idx),
            state,
            stage.skeletons.slice(idx + 1),
          ]
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

export default SkeletonConfig;
