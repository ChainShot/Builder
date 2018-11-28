import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import CodeFileOptionsNav from './CodeFileOptionsNav';
import './CodeFilesNav.scss';

class CodeFilesNav extends Component {
  render() {
    const { basename, stage: { codeFiles }} = this.props;
    return (
      <ul className="code-files-nav">
        <li>
          <NavLink to={`${basename}/details`}> Details </NavLink>
        </li>
        <li>
          <NavLink to={`${basename}/task`}> Task </NavLink>
        </li>
        <li>
          <NavLink to={`${basename}/validations`}> Validations </NavLink>
        </li>
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
        <Route path={path} children={({ match }) => (match && <CodeFileOptionsNav {...this.props} basename={path} />)} />
      </li>
    )
  }
}

export default CodeFilesNav;
