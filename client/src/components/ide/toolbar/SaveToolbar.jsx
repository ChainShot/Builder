import React, { Component } from 'react';

class SaveToolbar extends Component {
  render() {
    return (
      <React.Fragment>
        <li>
          Save
        </li>
        <li>
          Auto-Save
          <input type="checkbox" />
        </li>
      </React.Fragment>
    )
  }
}

export default SaveToolbar;
