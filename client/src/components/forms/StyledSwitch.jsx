import React, { Component } from 'react';
import Switch from "react-switch";
import Help from '../Help';
import "./StyledSwitch.scss";

class StyledSwitch extends Component {
  render() {
    const { label, hint, ...props } = this.props;
    return (
      <label>
        <Help hint={hint}> {label} </Help>
        <Switch {...props}
          className="styled-switch"
          height={24}
          width={48} />
      </label>
    )
  }
}

export default StyledSwitch;
