import React, {Component} from 'react';
import SVG from '../../SVG';
import './OutputToolbar.scss';

class OutputToolbar extends Component {
  render() {
    const { hide, runCode, cancelRun } = this.props;
    return (
      <div className="output-toolbar">
        <div className="tool" onClick={runCode}>
          <SVG name="play"/>
        </div>
        <div className="tool" onClick={cancelRun}>
          <SVG name="cancel"/>
        </div>
        <div className="tool end" onClick={hide}>
          <SVG name="minus"/>
        </div>
      </div>
    )
  }
}

export default OutputToolbar;
