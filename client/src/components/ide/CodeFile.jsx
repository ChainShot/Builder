import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import './CodeFile.scss';

class CodeFile extends Component {
  render() {
    const { codeFile: { initialCode, mode } } = this.props;
    return (
      <div className="code-file">
        <CodeEditor code={initialCode} mode={mode} />
      </div>
    )
  }
}

export default CodeFile;
