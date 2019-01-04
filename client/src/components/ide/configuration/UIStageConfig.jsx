import React, { Component } from 'react';

class UIStageConfig extends Component {
  render() {
    const { type } = this.props.stage;
    if(type !== 'UIStage') return null;
    return (
      <React.Fragment>

      </React.Fragment>
    )
  }
}

export default UIStageConfig;
