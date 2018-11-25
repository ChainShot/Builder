import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import apiMutation from '../../utils/apiMutation';
import modifyCodeFile from '../../mutations/codeFile/modify';
import './CodeFile.scss';

class CodeFile extends Component {
  updateCode(code) {
    const { codeFile: { id } } = this.props;
    apiMutation(modifyCodeFile, { id, initialCode: code });
  }
  render() {
    const { codeFile: { initialCode, mode } } = this.props;
    return (
      <div className="code-file">
        <CodeEditor code={initialCode} mode={mode} onUpdate={(code) => this.updateCode(code)}/>
      </div>
    )
  }
}

export default CodeFile;
