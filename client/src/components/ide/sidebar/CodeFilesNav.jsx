import React, { Component } from 'react';
import { NavLink, withRouter, Route } from 'react-router-dom';
import './CodeFilesNav.scss';

class CodeFilesNav extends Component {
  render() {
    const { stage: { codeFiles }} = this.props;
    return (
      <ul className="code-files-nav">
        { codeFiles.map(cf => <CodeFileNav key={cf.id} codeFile={cf} {...this.props} />) }
      </ul>
    )
  }
}

class CodeFileNav extends Component {
  render() {
    const { basename, codeFile: { name, id }} = this.props;
    const path = `${basename}/file/${id}`;
    return (
      <li>
        <NavLink to={path}>{ name }</NavLink>
      </li>
    )
  }
}

export default CodeFilesNav;
