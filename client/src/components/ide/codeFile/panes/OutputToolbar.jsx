import React, {Component} from 'react';
import SVG from '../../../SVG';
import './OutputToolbar.scss';

class OutputToolbar extends Component {
  render() {
    const { hide, runCode, cancelRun, running } = this.props;
    const runnerClasses = ['tool'];
    const cancelClasses = ['tool'];
    if(running) runnerClasses.push('disabled');
    if(!running) cancelClasses.push('disabled');
    return (
      <div className="output-toolbar">
        <div className={runnerClasses.join(' ')} onClick={runCode} data-rh="Run Code">
          <SVG name="play"/>
        </div>
        <div className={cancelClasses.join(' ')} onClick={cancelRun} data-rh="Cancel Run">
          <SVG name="cancel"/>
        </div>
        <div className="tool end" onClick={hide} data-rh="Hide">
          <SVG name="minus"/>
        </div>
      </div>
    )
  }
}

export default OutputToolbar;
