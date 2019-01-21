import React, { Component } from 'react';
import Help from '../Help';
import './StyledInput.scss';

class StyledInput extends Component {
  state = {
    touched: false,
  }
  onChange = (...args) => {
    const { onChange } = this.props;
    if(!this.state.touched) {
      this.setState({ touched: true })
    }
    onChange(...args);
  }
  render() {
    const { label, hint, value, field, type, onChange, errors } = this.props;
    const { touched } = this.state;
    const classes = ['styled'];
    if(touched) classes.push('touched');
    if(errors && errors.indexOf(field) >= 0) classes.push('has-error');
    return (
      <label>
        <Help hint={hint}> {label} </Help>
        <input type={type} className={classes.join(' ')} value={value}
          onChange={this.onChange}/>
      </label>
    )
  }
}

export default StyledInput;
