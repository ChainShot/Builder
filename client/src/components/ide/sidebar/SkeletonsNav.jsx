import React, { Component } from 'react';
import SkeletonNav from './SkeletonNav';
import SkeletonsNavActions from './SkeletonsNavActions';

class SkeletonsNav extends Component {
  render() {
    const { projectSkeletons, stage } = this.props;
    return (
      <React.Fragment>
        {(projectSkeletons || []).map(ps => (
          <SkeletonNav key={ps.id} skeleton={ps} {...this.props} />
        ))}
        <SkeletonsNavActions stage={stage}/>
      </React.Fragment>
    )
  }
}

export default SkeletonsNav;
