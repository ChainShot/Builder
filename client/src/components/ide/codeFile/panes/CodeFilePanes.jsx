import React, { Component } from 'react';
import './CodeFilePanes.scss';
import CodeFilePane from './CodeFilePane';
import CompilationTab from './CompilationTab';
import OutputTab from './OutputTab';
import { connect } from 'react-redux';

class CodeFilePanes extends Component {
  state = {
    pane: null,
  }
  componentDidUpdate(prevProps) {
    const { executionState: { running }} = this.props;
    if(!prevProps.executionState.running && running) {
      this.changePane('output');
    }
    const { compilationState: { compiling }} = this.props;
    if(!prevProps.compilationState.compiling && compiling) {
      this.changePane('compilation');
    }
  }
  changePane = (pane) => {
    this.setState({ pane });
    window.requestAnimationFrame(() => window.dispatchEvent(new CustomEvent('resize')));
  }
  classes(pane) {
    return this.state.pane === pane ? 'active' : '';
  }
  render() {
    const { pane } = this.state;
    const { stage, codeFile } = this.props;
    return (
      <div className="code-file-toolbar">
        <CodeFilePane changePane={this.changePane} pane={pane} stage={stage} codeFile={codeFile} />
        <ul className="actions">
          <CompilationTab changePane={this.changePane} pane={pane} codeFile={codeFile} />
          <OutputTab changePane={this.changePane} pane={pane} codeFile={codeFile} />
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ executionState, compilationState }) => ({ executionState, compilationState });

export default connect(
  mapStateToProps,
)(CodeFilePanes);
