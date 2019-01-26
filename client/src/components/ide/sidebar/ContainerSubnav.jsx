import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import SVG from '../../SVG';
import './ContainerSubnav.scss';
import AddBadge from './AddBadge';
import * as dialog from '../../../utils/dialog';

class ContainerSubnav extends Component {
  addBadge = () => {
    const { stageContainer: { stageContainerGroup } } = this.props;
    dialog.open(AddBadge, { stageContainerGroupId: stageContainerGroup.id }).then((id) => {
      const { basename } = this.props;
      this.props.history.push(`${basename}/badge/${id}`);
    });
  }
  render() {
    const { basename, stageContainer: { stageContainerGroup: { badgeTypes } } } = this.props;
    return (
      <ul className="sub-nav">
        <li className="configuration">
          <NavLink to={`${basename}`} exact>
            <SVG name="wrench"/>
            <span>configuration</span>
          </NavLink>
        </li>

        <li className="intro">
          <NavLink to={`${basename}/intro`}>
            <SVG name="file"/>
            <span>intro.md</span>
          </NavLink>
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
        <NavLink to={`${basename}/badge/${id}`}>
          <SVG name="badge"/>
          <span>{ name }</span>
        </NavLink>
      </li>
    )
  }
}

export default withRouter(ContainerSubnav);
