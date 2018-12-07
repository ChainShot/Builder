import React, { Component } from 'react';
import StyledSwitch from '../../forms/StyledSwitch';
import StyledSelect from '../../forms/StyledSelect';
import apiMutation from '../../../utils/api/mutation';
import './ContainerConfig.scss';

const typeOptions = [
  { label: 'Challenge', value: 'Challenge' },
  { label: 'Building Block', value: 'BuildingBlock' },
  { label: 'Lesson', value: 'Lesson' },
]

const mutation = `
mutation modifyStageContainer($id: String, $version: String, $type: String) {
  modifyStageContainer(id: $id, version: $version, type: $type) {
    id
    type
    version
  }
}
`

class ContainerConfig extends Component {
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
    const { id } = this.props.stageContainer;
    apiMutation(mutation, { [prop]: value, id });
  }
  render() {
    const { type, version, productionReady } = this.state;
    return (
      <form className="config">
        <label>
          <span>Version</span>
          <input value={version} onChange={({ target: { value }}) => this.handleChange('version', value)}/>
        </label>

        <StyledSelect
          label="Type"
          onChange={(val) => this.handleChange("type", val)}
          value={type}
          options={typeOptions} />

        <StyledSwitch
          label="Production Ready?"
          onChange={(val) => this.handleChange('productionReady', val)}
          checked={!!productionReady} />
      </form>
    )
  }
}

export default ContainerConfig;
