import React, { Component } from 'react';
import CodeEditor from '../CodeEditor';
import CodeFileToolbar from './CodeFileToolbar';
import './CodeFileEditor.scss';

class CodeFileEditor extends Component {
    render() {
      const { codeFile: { initialCode, mode }, ...props } = this.props;
      return (
        <div className="code-file-editor">
          <div className="editor-container">
            <CodeEditor code={initialCode} mode={mode} {...props}/>
          </div>
          <CodeFileToolbar {...props} />
        </div>
      )
    }
}

export default CodeFileEditor;
