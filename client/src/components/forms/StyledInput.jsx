import React, { Component } from 'react';
import Help from '../Help';
import './StyledInput.scss';

class StyledInput extends Component {
  render() {
    const { label, hint, value, field, type, onChange, errors } = this.props;
    const classes = ['styled'];
    if(errors && errors.indexOf(field) >= 0) classes.push('has-error');
    return (
      <label>
        <Help hint={hint}> {label} </Help>
        <input type={type} className={classes.join(' ')} value={value}
          onChange={onChange}/>
      </label>
    )
  }
}

export default StyledInput;
