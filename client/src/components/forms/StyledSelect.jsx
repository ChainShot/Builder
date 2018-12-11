import React, { Component } from 'react';
import Select from 'react-select';
import selectTheme from '../../utils/selectTheme';

class StyledSelect extends Component {
  render() {
    const { label, value, options, onChange,  ...props } = this.props;
    const option = options.find(x => x.value === value);
    const changeFn = ({ value }) => onChange(value);
    return (
      <label>
        <span>{ label }</span>
        <Select {...props}
          value={option}
          options={options}
          onChange={changeFn}
          className="styled-select"
          theme={selectTheme} />
      </label>
    )
  }
}

export default StyledSelect;
