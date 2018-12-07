import React, { Component } from 'react';
import Switch from "react-switch";

class StyledSwitch extends Component {
  render() {
    const { label, ...props } = this.props;
    return (
      <label>
        <span>{ label }</span>
        <Switch {...props}
          className="styled-switch"
          onColor="#ff8d21" />
      </label>
    )
  }
}

export default StyledSwitch;