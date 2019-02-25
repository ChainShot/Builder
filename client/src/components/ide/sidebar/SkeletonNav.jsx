import React, { Component } from 'react';
import SVG from 'components/SVG';
import { NavLink, withRouter } from 'react-router-dom';

class SkeletonNav extends Component {
  render() {
    const { basename, skeleton } = this.props;
    const { title, id } = skeleton;
    const path = `${basename}/skeleton/${id}`;
    return (
      <li>
        <NavLink to={path}>
          <SVG name="skeleton"/>
          <span>{ title }</span>
        </NavLink>
      </li>
    )
  }
}

export default withRouter(SkeletonNav);
