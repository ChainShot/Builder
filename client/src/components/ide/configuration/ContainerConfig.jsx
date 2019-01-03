import React, { Component } from 'react';
import StyledSwitch from '../../forms/StyledSwitch';
import StyledSelect from '../../forms/StyledSelect';
import apiMutation from '../../../utils/api/mutation';
import confirm from '../../../utils/confirm';
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
    props.onSave(({ stageContainer }) => {
      debugger;
      const {stageContainerGroup, id, version, type } = stageContainer;
      apiMutation(containerMutation, { id, version, type });
      // apiMutation(groupMutation, stageContainerGroup);
    })
  }
  destroyContainer = async () => {
    confirm("Are you sure you want to delete this version?").then(() => {
      const { id } = this.props.stageContainer;
      apiMutation(destroySC, { id });
      this.props.history.push(`/`);
    });
  }
  destroyGroup = async () => {
    confirm("Are you sure you want to delete this group?").then(() => {
      const { id } = this.props.stageContainer.stageContainerGroup;
      apiMutation(destroySCG, { id });
      this.props.history.push(`/`);
    });
  }
  render() {
    const { update,
      stageContainer: { type, version, productionReady, stageContainerGroup: { title } },
    } = this.props;
    const updateStageContainer = (state) => update({ stageContainer: state })
    const updateStageContainerGroup = (state) => update({ stageContainer: { stageContainerGroup: state } })
    return (
      <form className="config">
        <label>
          <span>Title</span>
          <input type="text" className="styled" value={title}
            onChange={({ target: { value }}) => updateStageContainerGroup({ title: value })}/>
        </label>

        <label>
          <span>Version</span>
          <input type="text" className="styled" value={version}
            onChange={({ target: { value }}) => updateStageContainer({ version: value })}/>
        </label>

        <StyledSelect
          label="Type"
          onChange={(type) => updateStageContainer({ type })}
          value={type}
          options={typeOptions} />

        <StyledSwitch
          label="Production Ready?"
          onChange={(productionReady) => updateStageContainer({ productionReady })}
          checked={!!productionReady} />

        <div className="btn btn-primary" onClick={this.destroyContainer}>
          <SVG name="trash" />
          Destroy this Version (v. { version })
        </div>

        <div className="btn btn-primary" onClick={this.destroyGroup}>
          <SVG name="trash" />
          Destroy { title }
        </div>
      </form>
    )
  }
}

export default ContainerConfig;
