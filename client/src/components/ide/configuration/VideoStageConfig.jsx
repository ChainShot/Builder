import React, { Component } from 'react';
import './VideoStageConfig.scss';

class VideoStageConfig extends Component {
  render() {
    const { type } = this.props.stage;
    if(type !== 'VideoStage') return null;
    return (
      <React.Fragment>
        <div className="video-warning">
          Video Stages are not currently editable
          through the Builder UI.
        </div>
      </React.Fragment>
    )
  }
}

export default VideoStageConfig;
