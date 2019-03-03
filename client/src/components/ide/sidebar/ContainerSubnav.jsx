import React, { Component } from 'react';
import SVG from 'components/SVG';
import './ContainerSubnav.scss';
import AddBadge from './dialogs/badge/AddBadge';
import * as dialog from 'utils/dialog';
import { IDE_TAB_TYPES } from 'config';
import ActionNav from './ActionNav';
import { connect } from 'react-redux';
import { openTab } from 'redux/actions';

class ContainerSubnav extends Component {
  addBadge = () => {
    const { stageContainer: { stageContainerGroup } } = this.props;
    dialog.open(AddBadge, { stageContainerGroupId: stageContainerGroup.id }).then((id) => {
      this.props.openTab(null, IDE_TAB_TYPES.BADGE_CONFIG, id);
    });
  }
  attributesFor(type) {
    return { stageId: null, id: null, type }
  }
  render() {
    const { stageContainer: { stageContainerGroup: { badgeTypes } } } = this.props;
    const configurationAttrs = this.attributesFor(IDE_TAB_TYPES.STAGE_CONTAINER_CONFIG);
    const introAttrs = this.attributesFor(IDE_TAB_TYPES.STAGE_CONTAINER_INTRO);
    return (
      <ul className="sub-nav">
        <ActionNav attrs={configurationAttrs}>
          <SVG name="wrench"/>
          <span>configuration</span>
        </ActionNav>

        <ActionNav attrs={introAttrs}>
          <SVG name="file"/>
          <span>intro.md</span>
        </ActionNav>

        {(badgeTypes || []).map(bt => (
          <BadgeTypeNav
            key={bt.id}
            badgeType={bt} />)
        )}

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
    const { badgeType: { name, id } } = this.props;
    const attrs = { stageId: null, type: IDE_TAB_TYPES.BADGE_CONFIG, id }
    return (
      <ActionNav attrs={attrs}>
        <SVG name="badge"/>
        <span>{ name }</span>
      </ActionNav>
    )
  }
}

const mapDispatchToProps = { openTab }

export default connect(
  null,
  mapDispatchToProps
)(ContainerSubnav);
