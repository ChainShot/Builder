import React, { Component } from 'react';
import CodeEditor from '../CodeEditor';
import CodeFilePanes from './panes/CodeFilePanes';
import './CodeFileEditor.scss';

class CodeFileEditor extends Component {
    render() {
      const { code, mode, update, stage, codeFile } = this.props;
      return (
        <div className="code-file-editor">
          <div className="editor-container">
            <CodeEditor code={code} mode={mode} onUpdate={(code) => update({ code })}/>
          </div>
          <CodeFilePanes stage={stage} codeFile={codeFile} code={code} />
        </div>
      )
    }
}

export default CodeFileEditor;
