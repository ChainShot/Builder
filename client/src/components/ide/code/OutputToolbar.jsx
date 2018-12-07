import React, {Component} from 'react';
import SVG from '../../SVG';
import './OutputToolbar.scss';

class OutputToolbar extends Component {
  render() {
    return (
      <div className="output-toolbar">
        <div className="tool">
          <SVG name="play"/>
        </div>
        <div className="tool">
          <SVG name="cancel"/>
        </div>
      </div>
    )
  }
}

export default OutputToolbar;
