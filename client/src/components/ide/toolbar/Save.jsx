import React, { Component } from 'react';
import SVG from '../../SVG';

class Save extends Component {
  render() {
    const { startSave, saveState: { saving, changes } } = this.props;
    const classes = ['save'];
    if(saving) classes.push('saving');
    if(changes) classes.push('has-changes');
    return (
      <li className={classes.join(' ')} onClick={startSave}>
        <SVG name="save" />
        <div>Save</div>
      </li>
    )
  }
}

export default Save;
