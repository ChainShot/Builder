import React, { Component } from 'react';
import apiMutation from '../../../utils/api/mutation';
import destroyStage from '../../../mutations/stage/destroy';
import CodeStageConfig from './CodeStageConfig';
import UiStageConfig from './UiStageConfig';
import DownloadStageConfig from './DownloadStageConfig';
import VideoStageConfig from './VideoStageConfig';
import StyledSelect from '../../forms/StyledSelect';
import {STAGE_TYPE_OPTIONS} from '../../../config';
import confirm from '../../../utils/confirm';
import SVG from '../../SVG';
import './ContainerConfig.scss';

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

class StageConfig extends Component {
  constructor(props) {
    super(props);
    props.onSave(({ stage }) => apiMutation(mutation, stage));
  }
  destroyStage = () => {
    confirm("Are you sure you want to delete this stage?").then(() => {
      const { id } = this.props.stage;
      apiMutation(destroyStage, { id });
    });
  }
  render() {
    const { update, stage } = this.props;
    const { title, position, type } = stage;
    const updateStage = (state) => update({ stage: state })
    return (
      <form className="config" ref="container">
        <label>
          <span>Title</span>
          <input type="text" className="styled" value={title}
            onChange={({ target: { value }}) => updateStage({ title: value })}/>
        </label>

        <label>
          <span>Position</span>
          <input type="number" className="styled" value={position}
            onChange={({ target: { value }}) => updateStage({ position: +value })}/>
        </label>

        <StyledSelect
          label="Type"
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

        <div className="btn btn-primary" onClick={this.destroyStage}>
          <SVG name="trash" />
          Destroy stage { title }
        </div>
      </form>
    )
  }
}

export default StageConfig;
