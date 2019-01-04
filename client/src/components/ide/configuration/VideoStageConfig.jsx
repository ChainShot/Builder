import React, { Component } from 'react';

class VideoStageConfig extends Component {
  render() {
    const { type } = this.props.stage;
    if(type !== 'VideoStage') return null;
    return (
      <React.Fragment>

      </React.Fragment>
    )
  }
}

export default VideoStageConfig;
