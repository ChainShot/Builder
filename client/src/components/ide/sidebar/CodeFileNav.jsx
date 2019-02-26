import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import SVG from 'components/SVG';
import CodeFileOptionsNav from './CodeFileOptionsNav';
import "./CodeFileNav.scss"

class CodeFileNav extends Component {
  render() {
    const { basename, codeFile } = this.props;
    const { name, id } = codeFile;
    const path = `${basename}/file/${id}`;
    return (
      <li className="code-file-nav">
        <NavLink to={path}>
          <SVG name="codefile"/>
          <span>{ name }</span>
        </NavLink>
        <Route path={path} children={({ match }) => (match && <CodeFileOptionsNav {...this.props} basename={path} codeFile={codeFile} />)} />
      </li>
    )
  }
}

export default CodeFileNav;
