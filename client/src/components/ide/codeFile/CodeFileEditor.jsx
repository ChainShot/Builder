import React, { Component } from 'react';
import CodeEditor from '../CodeEditor';
import CodeFilePanes from './panes/CodeFilePanes';
import runner from 'utils/api/runner';
import * as dialog from 'utils/dialog';
import { startCodeExecution, setCodeFilePane, completeCodeExecution } from 'redux/actions';
import { connect } from 'react-redux';
import { CODE_FILE_PANES } from 'config';
import './CodeFileEditor.scss';

class CodeFileEditor extends Component {
    getExecutionState() {
      const { stage, executionState } = this.props;
      return executionState.stages[stage.id] || executionState.default;
    }
    runCode = async () => {
      const { stage, code, codeFile } = this.props;
      const { runIdx } = this.getExecutionState();
      this.props.startCodeExecution(stage.id);
      this.props.setCodeFilePane(CODE_FILE_PANES.OUTPUT_TAB, stage.id);

      const files = stage.codeFiles
        .filter(x => x.executable)
        .map(({ id, initialCode, executablePath, hasProgress }) => {
          if(id === codeFile.id) {
            return { contents: code, path: executablePath }
          }
          if(hasProgress) {
            const solution = stage.solutions.find(x => x.codeFileId === id);
            return { contents: solution.code, path: executablePath }
          }
          return { contents: initialCode, path: executablePath }
        })

      const { id, languageVersion, language, testFramework, forkBlockNumber } = stage;
      let response;
      try {
        response = await runner.post('', {
          stageId: id,
          files,
          languageVersion,
          language,
          testFramework,
          forkBlockNumber,
        });
      }
      catch(ex) {
        const { response } = ex;
        if(response && response.status >= 400 && response.status < 500) {
          dialog.open(Error, { message: response.data });
        }
        else {
          dialog.open(Error, { message: "Oof. Failed to Run Your Code just now. \nPlease try again soon." });
        }
        this.props.completeCodeExecution(null, stage.id);
        return;
      }
      // if the run idx hasnt changed since this run started, display it
      if(this.getExecutionState().runIdx === runIdx) {
        this.props.completeCodeExecution(response.data, stage.id);
      }
    }
    render() {
      const { code, mode, update, stage, codeFile } = this.props;
      return (
        <div className="code-file-editor">
          <div className="editor-container">
            <CodeEditor
              code={code}
              mode={mode}
              runCode={this.runCode}
              onUpdate={(code) => update({ code })}/>
          </div>
          <CodeFilePanes
            stage={stage}
            codeFile={codeFile}
            runCode={this.runCode}
            code={code}/>
        </div>
      )
    }
}

const mapStateToProps = ({ executionState }) => ({ executionState });
const mapDispatchToProps = { startCodeExecution, setCodeFilePane, completeCodeExecution }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeFileEditor);
