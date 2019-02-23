import React, { Component } from 'react';
import './IFrameStageConfig.scss';
import StyledInput from '../../forms/StyledInput';
import { SLACK_INVITE } from '../../../config';

const SRC_HINT = 'The URL that the IFrame should display';

class IFrameStageConfig extends Component {
  render() {
    const { onChange,
      stage: { type, src }
    } = this.props;
    if(type !== 'IFrameStage') return null;
    return (
      <React.Fragment>
        <StyledInput
          label="IFrame URL"
          type="text"
          value={src}
          field="src"
          hint={SRC_HINT}
          onChange={({ target: { value }}) => onChange({ src: value })}/>
        <div className="note">
          Ensure this is a whitelisted URL. <br/>
          If you're unsure, ask in our&nbsp;
          <a href={SLACK_INVITE} target="_blank" rel="noopener noreferrer">Slack Workspace</a>
        </div>
      </React.Fragment>
    )
  }
}

export default IFrameStageConfig;
