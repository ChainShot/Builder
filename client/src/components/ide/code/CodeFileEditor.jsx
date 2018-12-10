import React, { Component } from 'react';
import CodeEditor from '../CodeEditor';
import CodeFileToolbar from './CodeFileToolbar';
import './CodeFileEditor.scss';

class CodeFileEditor extends Component {
    render() {
      const { codeFile: { initialCode, mode }, onUpdate } = this.props;
      return (
        <div className="code-file-editor">
          <div className="editor-container">
            <CodeEditor code={initialCode} mode={mode} onUpdate={onUpdate}/>
          </div>
          <CodeFileToolbar {...this.props} />
        </div>
      )
    }
}

export default CodeFileEditor;
