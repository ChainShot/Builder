import React, {Component} from 'react';
import {RunOutput} from 'chainshot-runoutput';
import './Output.scss';
import SVG from '../../SVG';
import runner from '../../../utils/api/runner';

class Output extends Component {
  state = {
    output: ""
  }
  runCode = () => {
    runner.post('/10923012930129', () => {
      console.log('weee')
    })
  }
  render() {
    const {output} = this.state;
    if(output) {
      return (
        <div className="output">
          <RunOutput response={output} />
        </div>
      )
    }
    return (
      <div className="output">
        <div className="btn btn-primary" onClick={this.runCode}>
          <SVG name="play"/>
          Run Code <span className="key">(CMD + ENTER)</span>
        </div>
      </div>
    )
  }
}

export default Output;
