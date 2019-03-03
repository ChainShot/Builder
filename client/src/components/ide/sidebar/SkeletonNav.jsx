import React, { Component } from 'react';
import SVG from 'components/SVG';
import { IDE_TAB_TYPES } from 'config';
import ActionNav from './ActionNav';

class SkeletonNav extends Component {
  render() {
    const { skeleton, stage } = this.props;
    const { title, id } = skeleton;
    const attrs = {
      stageId: stage.id,
      type: IDE_TAB_TYPES.SKELETON_CONFIG,
      id,
    }
    return (
      <ActionNav attrs={attrs}>
        <SVG name="skeleton"/>
        <span>{ title }</span>
      </ActionNav>
    )
  }
}

export default SkeletonNav;
