import React, { Component } from 'react';
import SVG from 'components/SVG';
import { openTab } from 'redux/actions';
import { connect } from 'react-redux';
import { IDE_TAB_TYPES } from 'config';

class SkeletonNav extends Component {
  openTab = () => {
    const { skeleton, stage } = this.props;
    this.props.openTab(stage.id, IDE_TAB_TYPES.SKELETON_CONFIG, skeleton.id);
  }
  render() {
    const { skeleton } = this.props;
    const { title, id } = skeleton;
    return (
      <li>
        <div className="action" onClick={this.openTab}>
          <SVG name="skeleton"/>
          <span>{ title }</span>
        </div>
      </li>
    )
  }
}

const mapDispatchToProps = { openTab } 

export default connect(
  null,
  mapDispatchToProps
)(SkeletonNav);
