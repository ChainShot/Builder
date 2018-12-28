import React, { Component } from 'react';
import SVG from '../../SVG';
import './SaveToolbar.scss';

class SaveToolbar extends Component {
  render() {
    return (
      <React.Fragment>
        <li className="save">
          <SVG name="save" />
          <div>Save</div>
        </li>
        <li className="auto-save">
          <SVG name="magic" />
          Auto-Save
        </li>
      </React.Fragment>
    )
  }
}

export default SaveToolbar;
