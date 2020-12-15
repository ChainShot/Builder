import React, { Component } from 'react';
import './CodeFilePanes.scss';
import CodeFilePane from './CodeFilePane';
import CompilationTab from './CompilationTab';
import OutputTab from './OutputTab';
import { setCodeFilePane } from 'redux/actions';
import { connect } from 'react-redux';
import { CODE_FILE_PANES } from 'config';

class CodeFilePanes extends Component {
  componentWillMount() {
    const { codeFilePaneState: { pane, stage } } = this.props;
    if(pane && stage !== this.props.stage) {
      // the pane was open on another stage, let's close it before rendering
      this.changePane(null);
    }
  }
  componentDidUpdate(prevProps) {
    const { executionState: { running }} = this.props;
    if(!prevProps.executionState.running && running) {
      this.changePane(CODE_FILE_PANES.OUTPUT_TAB);
    }
    const { compilationState: { compiling }} = this.props;
    if(!prevProps.compilationState.compiling && compiling) {
      this.changePane(CODE_FILE_PANES.COMPILATION_TAB);
    }
  }
  changePane = (pane) => {
    const { stage } = this.props;
    this.props.setCodeFilePane(pane, stage.id);
    // resize event for the monaco display
    window.requestAnimationFrame(() => window.dispatchEvent(new CustomEvent('resize')));
  }
  classes(pane) {
    const { codeFilePaneState } = this.props;
    if(codeFilePaneState.pane === pane) {
      return 'active';
    }
    return '';
  }
  render() {
    const { stage, codeFile, code, codeFilePaneState: { stages } } = this.props;
    const pane = stages[stage.id];
    return (
      <div className="code-file-toolbar">
        <CodeFilePane
          code={code}
          runCode={this.props.runCode}
          changePane={this.changePane}
          pane={pane} stage={stage} codeFile={codeFile} />
        <ul className="actions">
          <CompilationTab changePane={this.changePane} pane={pane} codeFile={codeFile} />
          <OutputTab changePane={this.changePane} pane={pane} codeFile={codeFile} />
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ executionState, compilationState, codeFilePaneState }) =>
  ({ executionState, compilationState, codeFilePaneState });

const mapDispatchToProps = { setCodeFilePane }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeFilePanes);
