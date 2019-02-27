import React, { Component } from 'react';
import SVG from 'components/SVG';
import './ContainerSubnav.scss';
import AddBadge from './dialogs/badge/AddBadge';
import * as dialog from 'utils/dialog';
import { openTab } from 'redux/actions';
import { connect } from 'react-redux';
import { IDE_TAB_TYPES } from 'config';

class ContainerSubnav extends Component {
  addBadge = () => {
    const { stageContainer: { stageContainerGroup } } = this.props;
    dialog.open(AddBadge, { stageContainerGroupId: stageContainerGroup.id }).then((id) => {
      const { basename } = this.props;
      this.props.history.push(`${basename}/badge/${id}`);
    });
  }
  openTab = (type) => {
    this.props.openTab(null, type);
  }
  render() {
    const { basename, stageContainer: { stageContainerGroup: { badgeTypes } } } = this.props;
    return (
      <ul className="sub-nav">
        <li className="configuration" onClick={() => this.openTab(IDE_TAB_TYPES.STAGE_CONTAINER_CONFIG)}>
          <div className="action">
            <SVG name="wrench"/>
            <span>configuration</span>
          </div>
        </li>

        <li className="intro">
          <div className="action" onClick={() => this.openTab(IDE_TAB_TYPES.STAGE_CONTAINER_INTRO)}>
            <SVG name="file"/>
            <span>intro.md</span>
          </div>
        </li>

        { (badgeTypes || []).map(bt => <BadgeTypeNav key={bt.id} badgeType={bt} {...this.props} />) }

        <li>
          <div className="action" onClick={this.addBadge}>
            <SVG name="empty-badge"/>
            <span>add a badge…</span>
          </div>
        </li>
      </ul>
    )
  }
}

class BadgeTypeNav extends Component {
  render() {
    const { basename, badgeType: { name, id } } = this.props;
    return (
      <li>
        <div className="action">
          <SVG name="badge"/>
          <span>{ name }</span>
        </div>
      </li>
    )
  }
}

const mapDispatchToProps = { openTab }

export default connect(
  null,
  mapDispatchToProps,
)(ContainerSubnav);
