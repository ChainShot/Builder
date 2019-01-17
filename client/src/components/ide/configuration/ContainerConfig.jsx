import React, { Component } from 'react';
import StyledSwitch from '../../forms/StyledSwitch';
import StyledSelect from '../../forms/StyledSelect';
import apiMutation from '../../../utils/api/mutation';
import confirm from '../../../utils/confirm';
import destroySC from '../../../mutations/stageContainer/destroy';
import destroySCG from '../../../mutations/stageContainerGroup/destroy';
import SVG from '../../SVG';
import Help from '../../Help';
import './ContainerConfig.scss';

const TITLE_HINT = 'Short name displayed to the user';
const DESCRIPTION_HINT = 'Description of this Contents purpose';
const VERSION_HINT = 'Uniquely identifies this Content in its group';
const ESTIMATED_TIME_HINT = 'How long a user should expect to complete this';
const THUMBNAIL_HINT = 'You give us a web URL of an image, we\'ll show it the user';
const TYPE_HINT = 'Tells the user what kind of content to expect';
const PRODUCTION_READY_HINT = 'When deployed, should this be shown to users?';

const typeOptions = [
  { label: 'Challenge', value: 'Challenge' },
  { label: 'Building Block', value: 'BuildingBlock' },
  { label: 'Lesson', value: 'Lesson' },
]

const toArgs = (v) => v.map(([prop, type]) => `$${prop}: ${type}`).join(', ');
const toMapping = (v) => v.map(([prop, type]) => `${prop}: $${prop}`).join(', ');
const toReturns = (v) => v.map(([prop]) => `${prop}`).join('\n    ');

const containerVariables = [
  ['id', 'String'],
  ['version', 'String'],
  ['type', 'String'],
];

const groupVariables = [
  ['id', 'String'],
  ['title', 'String'],
  ['description', 'String'],
  ['productionReady', 'Boolean'],
  ['thumbnailUrl', 'String'],
  ['estimatedTime', 'Int'],
];

const containerMutation = `
mutation modifyStageContainer(${toArgs(containerVariables)}) {
  modifyStageContainer(${toMapping(containerVariables)}) {
    ${toReturns(containerVariables)}
  }
}
`

const groupMutation = `
mutation modifyStageContainerGroup(${toArgs(groupVariables)}) {
  modifyStageContainerGroup(${toMapping(groupVariables)}) {
    ${toReturns(groupVariables)}
  }
}
`

const ripUpdates = (variables, doc) => {
  return variables.reduce((obj, [prop]) => {
    return {
      [prop]: doc[prop],
      ...obj,
    }
  }, {});
}

class ContainerConfig extends Component {
  constructor(props) {
    super(props);
    props.onSave(({ stageContainer }) => {
      const containerUpdates = ripUpdates(containerVariables, stageContainer);
      const { stageContainerGroup } = stageContainer;
      const groupUpdates = ripUpdates(groupVariables, stageContainerGroup);
      return Promise.all([
        apiMutation(containerMutation, containerUpdates),
        apiMutation(groupMutation, groupUpdates)
      ]);
    });
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
    const { stageContainer, update } = this.props;
    const { type, version,
      stageContainerGroup: {
        description, estimatedTime, thumbnailUrl, title, productionReady
      } } = stageContainer;
    const updateStageContainer = (state) => update({ stageContainer: state })
    const updateStageContainerGroup = (state) => update({ stageContainer: { stageContainerGroup: state } })
    return (
      <form className="config">
        <label>
          <Help hint={TITLE_HINT}> Title </Help>
          <input type="text" className="styled" value={title}
            onChange={({ target: { value }}) => updateStageContainerGroup({ title: value })}/>
        </label>

        <label>
          <Help hint={DESCRIPTION_HINT}> Description </Help>
          <textarea type="text" className="styled" value={description}
            onChange={({ target: { value }}) => updateStageContainerGroup({ description: value })}/>
        </label>

        <label>
          <Help hint={VERSION_HINT}> Version </Help>
          <input type="text" className="styled" value={version}
            onChange={({ target: { value }}) => updateStageContainer({ version: value })}/>
        </label>

        <label>
          <Help hint={ESTIMATED_TIME_HINT}> Estimated Time in Minutes </Help>
          <input type="number" className="styled" value={estimatedTime}
            onChange={({ target: { value }}) => updateStageContainerGroup({ estimatedTime: +value })}/>
        </label>

        <label>
          <Help hint={THUMBNAIL_HINT}> Thumbnail URL </Help>
          <input type="text" className="styled" value={thumbnailUrl}
            onChange={({ target: { value }}) => updateStageContainerGroup({ thumbnailUrl: value })}/>
        </label>

        <StyledSelect
          label="Type"
          hint={TYPE_HINT}
          onChange={(type) => updateStageContainer({ type })}
          value={type}
          options={typeOptions} />

        <StyledSwitch
          label="Production Ready?"
          hint={PRODUCTION_READY_HINT}
          onChange={(productionReady) => updateStageContainerGroup({ productionReady })}
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
