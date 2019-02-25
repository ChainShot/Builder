import React, { Component } from 'react';
import SkeletonNav from './SkeletonNav';
import SkeletonsNavActions from './SkeletonsNavActions';

class SkeletonsNav extends Component {
  render() {
    const { projectSkeletons } = this.props;
    return (
      <React.Fragment>
        {(projectSkeletons || []).map(ps => (
          <SkeletonNav key={ps.id} skeleton={ps} {...this.props} />
        ))}
        <SkeletonsNavActions {...this.props}/>
      </React.Fragment>
    )
  }
}

export default SkeletonsNav;
