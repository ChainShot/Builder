import React, { Component } from 'react';

class UiStageConfig extends Component {
  render() {
    const { type } = this.props.stage;
    if(type !== 'UiStage') return null;
    return (
      <React.Fragment>

      </React.Fragment>
    )
  }
}

export default UiStageConfig;
