import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './CodeFileOptionsNav.scss';

class CodeFileOptionsNav extends Component {
  render() {
    const { basename } = this.props;
    return (
      <ul className="code-file-options-nav">
        <li>
          <NavLink to={`${basename}/code`}>Initial Code</NavLink>
        </li>
      </ul>
    )
  }
}

export default CodeFileOptionsNav;
