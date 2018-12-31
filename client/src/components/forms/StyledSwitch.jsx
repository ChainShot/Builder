import React, { Component } from 'react';
import Switch from "react-switch";
import "./StyledSwitch.scss";

class StyledSwitch extends Component {
  render() {
    const { label, ...props } = this.props;
    return (
      <label>
        <span>{ label }</span>
        <Switch {...props}
          className="styled-switch"
          height={24}
          width={48} />
      </label>
    )
  }
}

export default StyledSwitch;
