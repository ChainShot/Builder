import React, { Component } from 'react';
import SVG from '../../../SVG';
import isMacLike from '../../../../utils/isMacLike';
import './RunResults.scss';
import './OutputDisplay.scss';

class OutputDisplay extends Component {
  render() {
    const metaKey = isMacLike() ? 'CMD' : 'CTRL';
    const { output, running, cancelRun, runCode } = this.props;
    if (running) {
      return (
        <div className="output-message">
          Running your code...
          <SVG name="cancel" onClick={cancelRun} /> to cancel or hit <span className="key">{metaKey} + ESC</span>
        </div>
      )
    }
    if (output) {
      if (output.stderr) {
        return (
          <div className="run-results">
            <div className="output">
              <pre>
                {output.stderr}
              </pre>
            </div>
          </div>
        );
      }
      const classes = ["run-results"];
      if (output.completed) classes.push("success");
      return (
        <div className={classes.join(" ")}>
          <div className="completed">
            <SVG name="check-square" className="valid" />
          </div>
          <div className="output">
            <pre>
              {output.stdout}
            </pre>
          </div>
        </div>
      )
    }
    return (
      <div className="output-message">
        No Output to Display. To run code click
        <SVG name="play" onClick={runCode} /> or hit <span className="key">{metaKey} + ENTER</span>
      </div>
    )
  }
}

export default OutputDisplay;
