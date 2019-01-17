import React, { Component } from 'react';
import Select from 'react-select';
import Help from '../Help';
import selectTheme from '../../utils/selectTheme';

class StyledSelect extends Component {
  render() {
    const { label, value, options, onChange, hint,  ...props } = this.props;
    const option = options.find(x => x.value === value);
    const changeFn = ({ value }) => onChange(value);
    return (
      <label>
        <Help hint={hint}> {label} </Help>
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
