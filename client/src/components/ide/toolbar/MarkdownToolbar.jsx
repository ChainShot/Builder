import React, { Component } from 'react';
import SaveToolbar from './SaveToolbar';

class MarkdownToolbar extends Component {
  render() {
    const { stageContainer } = this.props;
    return (
      <React.Fragment>
        <SaveToolbar stageContainer={stageContainer}/>
      </React.Fragment>
    )
  }
}

export default MarkdownToolbar;
