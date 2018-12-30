import React, { Component } from 'react';
import './CodeFileToolbar.scss';
import CodeFileToolbarPane from './CodeFileToolbarPane';
import CompilationTab from './CompilationTab';
import OutputTab from './OutputTab';
import { connect } from 'react-redux';

class CodeFileToolbar extends Component {
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
        <CodeFileToolbarPane pane={pane} stage={stage} codeFile={codeFile} />
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
)(CodeFileToolbar);
