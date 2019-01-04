import React, { Component } from 'react';
import './ProjectSkeletonsConfig.scss';

class ProjectSkeletonsConfig extends Component {
  render() {
    const { projectSkeletons } = this.props.stageContainer;
    return (
      <ul className="project-skeletons">
        {(projectSkeletons || []).map((skeleton) => (
          <div> { skeleton.title } </div>
        ))}
      </ul>
    )
  }
}

export default ProjectSkeletonsConfig;
