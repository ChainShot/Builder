import React, { Component } from 'react';
import RunCode from './RunCode';
import CompileCode from './CompileCode';
import './CodeToolbar.scss';

class CodeToolbar extends Component {
  render() {
    return (
      <li className="code-toolbar">
        <label> Code </label>
        <RunCode />
        <CompileCode />
      </li>
    )
  }
}

export default CodeToolbar;
