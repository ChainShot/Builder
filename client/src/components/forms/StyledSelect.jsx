import React, { Component } from 'react';
import Select from 'react-select';
import selectTheme from '../../utils/selectTheme';

class StyledSelect extends Component {
  render() {
    const { label, ...props } = this.props;
    return (
      <label>
        <span>{ label }</span>
        <Select {...props}
          className="styled-select"
          theme={selectTheme} />
      </label>
    )
  }
}

export default StyledSelect;
