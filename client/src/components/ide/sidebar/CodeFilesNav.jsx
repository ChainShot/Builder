import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import CodeFileOptionsNav from './CodeFileOptionsNav';
import './CodeFilesNav.scss';
import SVG from '../../SVG';

class CodeFilesNav extends Component {
  render() {
    const { basename, stage: { codeFiles }} = this.props;
    return (
      <ul className="code-files-nav">
        <li>
          <NavLink to={`${basename}`} exact> 
            <SVG name="wrench"/>
            <span>configuration</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={`${basename}/details`}> 
            <SVG name="file"/>
            <span>details.md</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={`${basename}/task`}> 
            <SVG name="file"/>
            <span>task.md</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={`${basename}/validations`}>
            <SVG name="file"/>
            <span>validations.json</span> 
          </NavLink>
        </li>
        { codeFiles.map(cf => <CodeFileNav key={cf.id} codeFile={cf} {...this.props} />) }
        <li>
          <div className="action"> 
            <SVG name="file-plus"/>
            <span>add code file…</span>
          </div>
        </li>
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
        <NavLink to={path}>
          <SVG name="codefile"/>
          <span>{ name }</span> 
        </NavLink>
        <Route path={path} children={({ match }) => (match && <CodeFileOptionsNav {...this.props} basename={path} />)} />
      </li>
    )
  }
}

export default CodeFilesNav;
