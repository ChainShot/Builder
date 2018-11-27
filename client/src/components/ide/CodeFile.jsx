import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import apiMutation from '../../utils/api/mutation';
import modifyCodeFile from '../../mutations/codeFile/modify';
import { withRouter } from 'react-router-dom';
import './CodeFile.scss';

class CodeFile extends Component {
  getCodeFile() {
    const { match: { params: { codeFileId } }, stage } = this.props;
    return stage.codeFiles.filter(x => x.id === codeFileId)[0];
  }
  updateCode(code) {
    const { id } = this.getCodeFile();
    apiMutation(modifyCodeFile, { id, initialCode: code });
  }
  render() {
    const { initialCode, mode } = this.getCodeFile();
    return (
      <div className="code-file">
        <CodeEditor code={initialCode} mode={mode} onUpdate={(code) => this.updateCode(code)}/>
      </div>
    )
  }
}

export default withRouter(CodeFile);
