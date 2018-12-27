import React, { Component } from 'react';
import MarkdownToolbar from './MarkdownToolbar';

class IntroToolbar extends Component {
  render() {
    const {stageContainer} = this.props;
    return (
      <React.Fragment>
        <MarkdownToolbar stageContainer={stageContainer}/>
        <li className="docs">
          Help
        </li>
      </React.Fragment>
    )
  }
}

export default IntroToolbar;
