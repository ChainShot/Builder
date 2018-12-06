import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SVG from '../../SVG';
import './CodeFileOptionsNav.scss';

class CodeFileOptionsNav extends Component {
  render() {
    const { basename } = this.props;
    return (
      <ul className="code-file-options-nav">
        <li>
          <NavLink to={`${basename}`} exact>
            <SVG name="codefile"/>
            <span>code</span>
          </NavLink>
          <NavLink to={`${basename}/config`}>
            <SVG name="wrench"/>
            <span>configuration</span>
          </NavLink>
        </li>
      </ul>
    )
  }
}

export default CodeFileOptionsNav;
