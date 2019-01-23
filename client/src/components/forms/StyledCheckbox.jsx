import React, { Component } from 'react';
import Help from '../Help';
import SVG from '../SVG';
import './StyledCheckbox.scss';

class StyledCheckbox extends Component {
  render() {
    const { label, hint, checked, onChange } = this.props;
    const classes = ['checkbox', 'styled'];
    if(checked) classes.push('checked');
    return (
      <label className={classes.join(' ')} onClick={() => onChange(!checked)}>
        <div className="box">
          <SVG name="check" />
        </div>
        <Help hint={hint}> {label} </Help>
      </label>
    )
  }
}

export default StyledCheckbox;
