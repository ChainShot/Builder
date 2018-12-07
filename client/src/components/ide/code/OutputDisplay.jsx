import React, {Component} from 'react';
import {RunOutput} from 'chainshot-runoutput';
import SVG from '../../SVG';
import './RunResults.scss';
import './OutputDisplay.scss';

class OutputDisplay extends Component {
  render() {
    const {output} = this.props;
    if(output) return <RunOutput response={output} />
    return (
      <div className="output-message">
        <p>
          No Output to Display. To run code click
          <SVG name="play"/> or hit <span className="key">CMD + ENTER</span>
        </p>
      </div>
    )
  }
}

export default OutputDisplay;
