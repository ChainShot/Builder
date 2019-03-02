import React, { Component } from 'react';
import CodeFilesNavActions from './CodeFilesNavActions';
import CodeFileDirectory from './CodeFileDirectory';

class CodeFilesNav extends Component {
  render() {
    const { codeFiles, stage, stageContainer } = this.props;
    return (
      <React.Fragment>
        <CodeFileDirectory codeFiles={codeFiles} stage={stage}/>
        <CodeFilesNavActions stage={stage} stageContainer={stageContainer}/>
      </React.Fragment>
    )
  }
}

export default CodeFilesNav;
