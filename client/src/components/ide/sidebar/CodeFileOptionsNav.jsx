import React, { Component } from 'react';
import { NavLink, withRouter, Route } from 'react-router-dom';
import './CodeFileOptionsNav.scss';

class CodeFileOptionsNav extends Component {
  render() {
    const { basename } = this.props;
    return (
      <ul className="code-file-options-nav">
        <li>
          <NavLink to={`${basename}/code`}>Code</NavLink>
          <NavLink to={`${basename}/config`}>Configuration</NavLink>
        </li>
      </ul>
    )
  }
}

export default CodeFileOptionsNav;
