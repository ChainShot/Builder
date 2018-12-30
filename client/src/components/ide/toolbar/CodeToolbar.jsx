import React, { Component } from 'react';
import RunCode from './RunCode';
import CompileCode from './CompileCode';
import './CodeToolbar.scss';

class CodeToolbar extends Component {
  render() {
    const { codeFile } = this.props;
    return (
      <li className="code-toolbar">
        <label> code </label>
        <RunCode />
        <CompileCode codeFile={codeFile} />
      </li>
    )
  }
}

export default CodeToolbar;
