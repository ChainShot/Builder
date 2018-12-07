import React, {Component} from 'react';
import './Output.scss';
import runner from '../../../utils/api/runner';
import OutputDisplay from './OutputDisplay';
import OutputToolbar from './OutputToolbar';

class Output extends Component {
  state = {
    output: ""
  }
  runCode = async () => {
    const { stage } = this.props;
    const files = stage.codeFiles.map(({ id, initialCode }) => ({ id, contents: initialCode }));
    const { data } = await runner.post(stage.id, {files});
    this.setState({ output: data });
  }
  render() {
    return (
      <div className="output">
        <OutputToolbar />
        <OutputDisplay />
      </div>
    )
  }
}

export default Output;
