import React, {Component} from 'react';
import './Output.scss';
import OutputDisplay from './OutputDisplay';
import OutputToolbar from './OutputToolbar';
import { completeCodeExecution } from 'redux/actions';
import { connect } from 'react-redux';
import { CODE_FILE_PANES } from 'config';

class Output extends Component {
  shortcut = (evt) => {
    if((evt.ctrlKey || evt.metaKey) && (evt.keyCode === 13) && !(evt.shiftKey || evt.altKey)) {
      this.props.runCode();
      evt.preventDefault();
    }
    if((evt.ctrlKey || evt.metaKey) && (evt.keyCode === 27) && !(evt.shiftKey || evt.altKey)) {
      const { stage } = this.props;
      this.props.completeCodeExecution(null, stage.id);
      evt.preventDefault();
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', (...args) => this.shortcut(...args));
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', (...args) => this.shortcut(...args));
  }
  cancelRun = () => {
    const { stage } = this.props;
    this.props.completeCodeExecution(null, stage.id);
  }
  getExecutionState() {
    const { stage, executionState } = this.props;
    return executionState.stages[stage.id] || executionState.default;
  }
  render() {
    const { hide, shouldShow } = this.props;
    const { output, running } = this.getExecutionState();
    if(!shouldShow) return null;
    return (
      <div className="output">
        <OutputToolbar hide={hide} runCode={this.props.runCode} cancelRun={this.cancelRun} running={running} />
        <OutputDisplay output={output} running={running} cancelRun={this.cancelRun} />
      </div>
    )
  }
}

const mapStateToProps = ({ executionState }) => ({ executionState });
const mapDispatchToProps = { completeCodeExecution }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Output);
