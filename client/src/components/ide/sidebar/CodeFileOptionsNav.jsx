import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SVG from '../../SVG';
import './CodeFileOptionsNav.scss';

class CodeFileOptionsNav extends Component {
  renderSolution() {
    const { codeFile, basename } = this.props;
    if(codeFile.hasProgress) {
      return (
        <li>
          <NavLink to={`${basename}/solution`} exact data-rh="Your Solution" data-rh-at="right">
            <SVG name="codefile"/>
            <span>solution</span>
          </NavLink>
        </li>
      )
    }
  }
  render() {
    const { basename } = this.props;
    return (
      <ul className="code-file-options-nav">
        <li>
          <NavLink to={`${basename}`} exact data-rh="User's Initial Code" data-rh-at="right">
            <SVG name="codefile"/>
            <span>initial code</span>
          </NavLink>
        </li>
        {this.renderSolution()}
        <li>
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
