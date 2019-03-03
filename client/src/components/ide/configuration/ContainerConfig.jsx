import React, { Component } from 'react';
import StyledSwitch from 'components/forms/StyledSwitch';
import StyledSelect from 'components/forms/StyledSelect';
import StyledInput from 'components/forms/StyledInput';
import apiMutation from 'utils/api/mutation';
import confirm from 'utils/confirm';
import destroySC from 'mutations/stageContainer/destroy';
import destroySCG from 'mutations/stageContainerGroup/destroy';
import { withRouter } from 'react-router-dom'
import SVG from 'components/SVG';
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

const stageContainerValidators = {
  version: (x) => !!x,
}

const stageContainerGroupValidators = {
  title: (x) => !!x,
}

const validate = (props, validators) => {
  return Object.keys(props).reduce((errors, prop) => {
    if(validators.hasOwnProperty(prop) && !validators[prop](props[prop])) return errors.concat(prop);
    return errors;
  }, []);
}

class ContainerConfig extends Component {
  constructor(props) {
    super(props);
    props.onValidate(({ stageContainer }) => {
      const { stageContainerGroup } = stageContainer;
      const scErrors = validate(stageContainer, stageContainerValidators);
      const scgErrors = validate(stageContainerGroup, stageContainerGroupValidators);
      return scErrors.concat(scgErrors);
    });
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
      this.props.history.push(`/`);
      apiMutation(destroySC, { id });
    });
  }
  destroyGroup = async () => {
    confirm("Are you sure you want to delete this group?").then(() => {
      const { id } = this.props.stageContainer.stageContainerGroup;
      this.props.history.push(`/`);
      apiMutation(destroySCG, { id });
    });
  }
  render() {
    const { stageContainer, update, errors } = this.props;
    const { type, version,
      stageContainerGroup: {
        description, estimatedTime, thumbnailUrl, title, productionReady
      } } = stageContainer;
    const updateStageContainer = (state) => update({ stageContainer: state })
    const updateStageContainerGroup = (state) => update({ stageContainer: { stageContainerGroup: state } })
    return (
      <div className="container-config">
        <form className="config">
          <StyledInput
            hint={TITLE_HINT}
            label="Title"
            type="text"
            value={title}
            errors={errors}
            field="title"
            onChange={({ target: { value }}) => updateStageContainerGroup({ title: value })} />

          <StyledInput
            hint={DESCRIPTION_HINT}
            label="Description"
            type="text"
            value={description}
            errors={errors}
            field="description"
            onChange={({ target: { value }}) => updateStageContainerGroup({ description: value })} />

          <StyledInput
            hint={VERSION_HINT}
            label="Version"
            type="text"
            value={version}
            errors={errors}
            field="version"
            onChange={({ target: { value }}) => updateStageContainer({ version: value })} />

          <StyledInput
            hint={ESTIMATED_TIME_HINT}
            label="Estimated Time in Minutes"
            type="number"
            value={estimatedTime}
            errors={errors}
            field="estimatedTime"
            onChange={({ target: { value }}) => updateStageContainerGroup({ estimatedTime: +value })} />

          <StyledInput
            hint={THUMBNAIL_HINT}
            label="Thumbnail URL"
            type="text"
            value={thumbnailUrl}
            errors={errors}
            field="thumbnailUrl"
            onChange={({ target: { value }}) => updateStageContainerGroup({ thumbnailUrl: value })} />

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
      </div>
    )
  }
}

export default withRouter(ContainerConfig);
