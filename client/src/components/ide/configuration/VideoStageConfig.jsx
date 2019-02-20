import React, { Component } from 'react';
import './VideoStageConfig.scss';
import StyledInput from '../../forms/StyledInput';

const YOUTUBE_HINT = 'YouTube video IDs can be found in the URL (i.e. ?v=ID)';

class VideoStageConfig extends Component {
  render() {
    const { onChange,
      stage: { type, youtubeId }
    } = this.props;
    if(type !== 'VideoStage') return null;
    return (
      <React.Fragment>
        <StyledInput
          label="YouTube Video ID"
          type="text"
          value={youtubeId}
          field="youtubeId"
          hint={YOUTUBE_HINT}
          onChange={({ target: { value }}) => onChange({ youtubeId: value })}/>
      </React.Fragment>
    )
  }
}

export default VideoStageConfig;
