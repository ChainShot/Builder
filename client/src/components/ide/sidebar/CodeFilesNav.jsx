import React, { Component } from 'react';
import CodeFileNav from './CodeFileNav';
import CodeFilesNavActions from './CodeFilesNavActions';
import CodeFileDirectory from './CodeFileDirectory';
import SVG from 'components/SVG';

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
