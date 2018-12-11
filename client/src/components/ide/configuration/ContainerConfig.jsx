import React, { Component } from 'react';
import StyledSwitch from '../../forms/StyledSwitch';
import StyledSelect from '../../forms/StyledSelect';
import apiMutation from '../../../utils/api/mutation';
import destroySC from '../../../mutations/stageContainer/destroy';
import destroySCG from '../../../mutations/stageContainerGroup/destroy';
import SVG from '../../SVG';
import './ContainerConfig.scss';

const typeOptions = [
  { label: 'Challenge', value: 'Challenge' },
  { label: 'Building Block', value: 'BuildingBlock' },
  { label: 'Lesson', value: 'Lesson' },
]

const containerMutation = `
mutation modifyStageContainer($id: String, $version: String, $type: String) {
  modifyStageContainer(id: $id, version: $version, type: $type) {
    id
    type
    version
  }
}
`

const groupMutation = `
mutation modifyStageContainerGroup($id: String, $title: String) {
  modifyStageContainerGroup(id: $id, title: $title) {
    title
  }
}
`

class ContainerConfig extends Component {
  constructor(props) {
    super(props);
    const { type, version, productionReady, stageContainerGroup } = props.stageContainer;
    const { title } = stageContainerGroup;
    this.state = {
      type,
      version,
      productionReady,
      title,
    }
  }
  handleGroupChange(prop, value) {
    this.setState({ [prop]: value });
    const { id } = this.props.stageContainer.stageContainerGroup;
    apiMutation(groupMutation, { [prop]: value, id });
  }
  handleContainerChange(prop, value) {
    this.setState({ [prop]: value });
    const { id } = this.props.stageContainer;
    apiMutation(containerMutation, { [prop]: value, id });
  }
  destroyContainer = async () => {
    const { id } = this.props.stageContainer;
    apiMutation(destroySC, { id });
    this.props.history.push(`/`);
  }
  destroyGroup = async () => {
    const { id } = this.props.stageContainer.stageContainerGroup;
    apiMutation(destroySCG, { id });
    this.props.history.push(`/`);
  }
  render() {
    const { type, version, productionReady, title } = this.state;
    return (
      <form className="config">
        <label>
          <span>Title</span>
          <input value={title} onChange={({ target: { value }}) => this.handleGroupChange('title', value)}/>
        </label>

        <label>
          <span>Version</span>
          <input value={version} onChange={({ target: { value }}) => this.handleContainerChange('version', value)}/>
        </label>

        <StyledSelect
          label="Type"
          onChange={(val) => this.handleContainerChange("type", val)}
          value={type}
          options={typeOptions} />

        <StyledSwitch
          label="Production Ready?"
          onChange={(val) => this.handleGroupChange('productionReady', val)}
          checked={!!productionReady} />

        <div class="btn btn-primary" onClick={this.destroyContainer}>
          <SVG name="trash" />
          Destroy this Version (v. { version })
        </div>

        <div class="btn btn-primary" onClick={this.destroyGroup}>
          <SVG name="trash" />
          Destroy { title }
        </div>
      </form>
    )
  }
}

export default ContainerConfig;
