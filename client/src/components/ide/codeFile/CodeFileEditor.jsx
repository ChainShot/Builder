import React, { Component } from 'react';
import CodeEditor from '../CodeEditor';
import CodeFileToolbar from './toolbar/CodeFileToolbar';
import './CodeFileEditor.scss';

class CodeFileEditor extends Component {
    render() {
      const { code, mode, onUpdate } = this.props;
      return (
        <div className="code-file-editor">
          <div className="editor-container">
            <CodeEditor code={code} mode={mode} onUpdate={onUpdate}/>
          </div>
          <CodeFileToolbar {...this.props} />
        </div>
      )
    }
}

export default CodeFileEditor;
