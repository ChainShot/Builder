import React, { Component } from 'react';

class DownloadStageConfig extends Component {
  render() {
    const { type } = this.props.stage;
    if(type !== 'DownloadStage') return null;
    return (
      <React.Fragment>

      </React.Fragment>
    )
  }
}

export default DownloadStageConfig;
