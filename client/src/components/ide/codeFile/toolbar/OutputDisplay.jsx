import React, {Component} from 'react';
import {RunOutput} from 'chainshot-runoutput';
import SVG from '../../../SVG';
import isMacLike from '../../../../utils/isMacLike';
import './RunResults.scss';
import './OutputDisplay.scss';

class OutputDisplay extends Component {
  render() {
    const {output, running, cancelRun, runCode} = this.props;
    if(running) {
      return (
        <div className="output-message">
          Running your code... Click
          <SVG name="cancel" onClick={cancelRun}/> to cancel
        </div>
      )
    }
    if(output) {
      return <RunOutput response={output} />
    }
    const metaKey = isMacLike ? 'CMD' : 'CTRL';
    return (
      <div className="output-message">
        No Output to Display. To run code click
        <SVG name="play" onClick={runCode}/> or hit <span className="key">{metaKey} + ENTER</span>
      </div>
    )
  }
}

export default OutputDisplay;
