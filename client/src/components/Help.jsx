import React, { Component } from 'react';
import SVG from './SVG';
import './Help.scss';

class Help extends Component {
  render() {
    const { hint } = this.props;
    return (
      <div className="help">
        { this.props.children }
        { hint && <SVG name="help" data-rh={hint}/> }
      </div>
    )
  }
}

export default Help;
