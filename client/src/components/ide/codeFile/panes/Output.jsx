import React, {Component} from 'react';
import './Output.scss';
import runner from '../../../../utils/api/runner';
import * as dialog from '../../../../utils/dialog';
import Error from '../../../dialogs/Error';
import OutputDisplay from './OutputDisplay';
import OutputToolbar from './OutputToolbar';
import { completeCodeExecution, startCodeExecution } from '../../../../redux/actions';
import { connect } from 'react-redux';

class Output extends Component {
  state = {
    runIdx: 0,
  }
  cancelRun = () => {
    this.setState({ runIdx: this.state.runIdx + 1 });
    this.props.completeCodeExecution(null);
  }
  runCode = async () => {
    const { stage, code, codeFile } = this.props;
    const { runIdx } = this.state;

    const files = stage.codeFiles.map(({ id, initialCode, executablePath, hasProgress }) => {
      if(id === codeFile.id) {
        return { contents: code, path: executablePath }
      }
      if(hasProgress) {
        const solution = stage.solutions.find(x => x.codeFileId === id);
        return { contents: solution.code, path: executablePath }
      }
      return { contents: initialCode, path: executablePath }
    });

    const { languageVersion, language, testFramework } = stage;
    let response;
    try {
      response = await runner.post('', {
        files,
        languageVersion,
        language,
        testFramework,
      });  
    }
    catch(ex) {
      dialog.open(Error, { message: "Oof. Failed to Run Your Code just now. \nPlease try again soon." });
      this.props.completeCodeExecution();
      return;
    }
    if(this.state.runIdx === runIdx) {
      this.props.completeCodeExecution(response.data);
    }
  }
  startRun = () => {
    this.props.startCodeExecution();
  }
  componentDidUpdate(prevProps) {
    const { executionState: { running }} = this.props;
    if(!prevProps.executionState.running && running) {
      this.runCode();
    }
  }
  render() {
    const { hide, shouldShow, executionState: { output, running } } = this.props;
    if(!shouldShow) return null;
    return (
      <div className="output">
        <OutputToolbar hide={hide} runCode={this.startRun} cancelRun={this.cancelRun} running={running} />
        <OutputDisplay output={output} running={running} runCode={this.startRun} cancelRun={this.cancelRun} />
      </div>
    )
  }
}

const mapStateToProps = ({ executionState }) => ({ executionState });
const mapDispatchToProps = { completeCodeExecution, startCodeExecution }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Output);
