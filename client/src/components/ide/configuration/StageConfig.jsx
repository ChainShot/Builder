import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import apiMutation from '../../../utils/api/mutation';
import destroyStage from '../../../mutations/stage/destroy';
import DuplicateStage from './DuplicateStage';
import CodeStageConfig from './CodeStageConfig';
import UiStageConfig from './UiStageConfig';
import DownloadStageConfig from './DownloadStageConfig';
import VideoStageConfig from './VideoStageConfig';
import StyledSelect from '../../forms/StyledSelect';
import StyledInput from '../../forms/StyledInput';
import {STAGE_TYPE_OPTIONS} from '../../../config';
import confirm from '../../../utils/confirm';
import * as dialog from '../../../utils/dialog';
import SVG from '../../SVG';
import './ContainerConfig.scss';

const TITLE_HINT = 'Short name displayed to the user';
const POSITION_HINT = 'The order of this stage relative to other stages';
const TYPE_HINT = 'Determines the interface the user will encounter';

const variables = [
  ['id', 'String'],
  ['title', 'String'],
  ['language', 'String'],
  ['type', 'String'],
  ['position', 'Int'],
  ['languageVersion', 'String'],
  ['testFramework', 'String'],
]

const args = variables.map(([prop, type]) => `$${prop}: ${type}`).join(', ');
const mapping = variables.map(([prop, type]) => `${prop}: $${prop}`).join(', ');
const returns = variables.map(([prop]) => `${prop}`).join('\n    ');

const mutation = `
mutation modifyStage(${args}) {
  modifyStage(${mapping}) {
    ${returns}
  }
}
`

const validators = {
  title: (x) => !!x,
  position: (x) => (x >= 0),
}

const validate = (props) => {
  return Object.keys(props).reduce((errors, prop) => {
    if(validators.hasOwnProperty(prop) && !validators[prop](props[prop])) return errors.concat(prop);
    return errors;
  }, []);
}

class StageConfig extends Component {
  constructor(props) {
    super(props);
    props.onValidate(({ stage }) => validate(stage));
    props.onSave(({ stage }) => apiMutation(mutation, stage));
  }
  destroyStage = () => {
    confirm("Are you sure you want to delete this stage?").then(() => {
      const { id } = this.props.stage;
      apiMutation(destroyStage, { id });
    });
  }
  duplicateStage = () => {
    const { match: { url }, stage } = this.props;
    dialog.open(DuplicateStage, stage).then((id) => {
      if(id) {
        this.props.history.push(url.split('/').slice(0, -1).concat(id).join('/'));
      }
    });
  }
  render() {
    const { update, stage, saveState: { errors } } = this.props;
    const { title, position, type } = stage;
    const updateStage = (state) => update({ stage: state });
    return (
      <form className="config" ref="container">
        <StyledInput
          label="Title"
          type="text"
          value={title}
          errors={errors}
          field="title"
          hint={TITLE_HINT}
          onChange={({ target: { value }}) => updateStage({ title: value })}/>

        <StyledInput
          label="Position"
          type="number"
          field="position"
          errors={errors}
          value={position}
          hint={POSITION_HINT}
          onChange={({ target: { value }}) => updateStage({ position: +value })} />

        <StyledSelect
          label="Type"
          hint={TYPE_HINT}
          onChange={(type) => updateStage({ type })}
          value={type}
          options={STAGE_TYPE_OPTIONS} />

        <CodeStageConfig
          stage={stage}
          onChange={updateStage} />

        <UiStageConfig
          stage={stage}
          onChange={updateStage} />

        <DownloadStageConfig
          stage={stage}
          onChange={updateStage} />

        <VideoStageConfig
          stage={stage}
          onChange={updateStage} />

        <div className="btn btn-primary" onClick={this.duplicateStage}>
          <SVG name="clone" />
          Duplicate stage
        </div>

        <div className="btn btn-primary" onClick={this.destroyStage}>
          <SVG name="trash" />
          Destroy stage
        </div>
      </form>
    )
  }
}

export default withRouter(StageConfig);
