import React, { Component } from 'react';
import Select from 'react-select';
import Switch from "react-switch";
import selectTheme from '../../utils/selectTheme';
import './Config.scss';

const typeOptions = [
  { label: 'Challenge', value: 'Challenge' },
  { label: 'Building Block', value: 'BuildingBlock' },
  { label: 'Lesson', value: 'Lesson' },
]

class Config extends Component {
  constructor(props) {
    super(props);
    const { type, version, productionReady } = props.stageContainer;
    this.state = {
      type: typeOptions.filter(x => x.value === type)[0], 
      version,
      productionReady,
    }
  }
  handleChange(prop, value) {
    this.setState({ [prop]: value });
  }
  render() {
    const { type, version, productionReady } = this.state;
    return (
      <div className="config">
        <label>
          <span>Version</span>
          <input value={version} onChange={({ target: { value }}) => this.handleChange('version', value)}/>
        </label>

        <label>
          <span>Type</span>
          <Select
            className="styled-select"
            theme={selectTheme}
            value={type}
            onChange={(val) => this.handleChange("type", val)}
            options={typeOptions}
          />
        </label>

        <label>
          <span>Production Ready?</span>
          <Switch
            onChange={(val) => this.handleChange('productionReady', val)}
            className="styled-switch"
            onColor="#ff8d21"
            checked={!!productionReady} />
        </label>


      </div>
    )
  }
}

export default Config;
