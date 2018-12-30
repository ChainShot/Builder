import React, { Component } from 'react';
import Output from './Output';
import Compilation from './Compilation';

class CodeFileToolbarPane extends Component {
  render() {
    const { pane, stage, codeFile } = this.props;
    if(pane === 'output') {
      return <Output stage={stage}
                     codeFile={codeFile}
                     hide={() => this.changePane('')}/>
    }
    if(pane === 'compilation') {
      return <Compilation stage={stage}
                     codeFile={codeFile}
                     hide={() => this.changePane('')}/>
    }
    return null;
  }
}

export default CodeFileToolbarPane;
