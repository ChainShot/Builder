import React, { Component } from 'react';
import './UiStageConfig.scss';

class UiStageConfig extends Component {
  render() {
    const { type } = this.props.stage;
    if(type !== 'UiStage') return null;
    return (
      <React.Fragment>
        <div className="ui-warning">
          UI Stages are Custom Flexible Components
          which are not currently editable through the Builder UI.
        </div>
      </React.Fragment>
    )
  }
}

export default UiStageConfig;
