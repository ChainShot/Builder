import React, {Component} from 'react';
import './Output.scss';
import runner from '../../../../utils/api/runner';
import OutputDisplay from './OutputDisplay';
import OutputToolbar from './OutputToolbar';

class Output extends Component {
  state = {
    output: "",
    running: false,
    runIdx: 0,
  }
  cancelRun = () => {
    this.setState({ runIdx: this.state.runIdx + 1, running: false })
  }
  runCode = async () => {
    const { stage } = this.props;
    const { runIdx } = this.state;
    const files = stage.codeFiles.map(({ id, initialCode }) => ({ id, contents: initialCode }));

    this.setState({ running: true });
    const { data } = await runner.post(stage.id, {files});
    if(this.state.runIdx === runIdx) {
      this.setState({ output: data, runIdx: runIdx + 1, running: false });
    }
  }
  render() {
    const { hide, cancelRun } = this.props;
    const { running, output } = this.state;
    return (
      <div className="output">
        <OutputToolbar hide={hide} runCode={this.runCode} cancelRun={this.cancelRun} running={running} />
        <OutputDisplay output={output} running={running} runCode={this.runCode} cancelRun={this.cancelRun} />
      </div>
    )
  }
}

export default Output;
