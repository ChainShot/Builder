import React, { Component } from 'react';
import apiMutation from '../../../utils/api/mutation';
import destroyStage from '../../../mutations/stage/destroy';
import DuplicateStage from './DuplicateStage';
import CodeStageConfig from './CodeStageConfig';
import IFrameStageConfig from './IFrameStageConfig';
import DownloadStageConfig from './DownloadStageConfig';
import VideoStageConfig from './VideoStageConfig';
import StyledSelect from '../../forms/StyledSelect';
import StyledInput from '../../forms/StyledInput';
import {STAGE_TYPE_OPTIONS} from '../../../config';
import confirm from '../../../utils/confirm';
import * as dialog from '../../../utils/dialog';
import SVG from '../../SVG';
import './StageConfig.scss';
import allFields from 'fragments/stageContainer/allFields';
import { closeTabs, openSidebarStage, openTab } from 'redux/actions';
import { connect } from 'react-redux';
import { IDE_TAB_TYPES } from 'config';

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
  ['forkBlockNumber', 'Int'],
  ['testFramework', 'String'],
  ['youtubeId', 'String'],
  ['src', 'String'],
]

const args = variables.map(([prop, type]) => `$${prop}: ${type}`).join(', ');
const mapping = variables.map(([prop, type]) => `${prop}: $${prop}`).join(', ');

const mutation = `
${allFields}
mutation modifyStage(${args}) {
  modifyStage(${mapping}) {
    stageContainer {
      ...allFields
    }
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
    props.onSave(({ stage }) => apiMutation(mutation, stage, true));
  }
  destroyStage = () => {
    confirm("Are you sure you want to delete this stage?").then(() => {
      const { id } = this.props.stage;
      this.props.closeTabs({ stageId: id });
      apiMutation(destroyStage, { id });
    });
  }
  duplicateStage = () => {
    const { stage } = this.props;
    dialog.open(DuplicateStage, stage).then((id) => {
      this.props.openSidebarStage(id);
      this.props.openTab(id, IDE_TAB_TYPES.STAGE_CONFIG);
    });
  }
  render() {
    const { update, stage, errors } = this.props;
    const { title, position, type } = stage;
    const updateStage = (state) => update({ stage: state });
    return (
      <div className="stage-config">
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

          <IFrameStageConfig
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
      </div>
    )
  }
}

const mapDispatchToProps = { closeTabs, openSidebarStage, openTab }

export default connect(
  null,
  mapDispatchToProps,
)(StageConfig);
