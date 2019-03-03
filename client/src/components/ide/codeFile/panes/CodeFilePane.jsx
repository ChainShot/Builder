import React, { Component } from 'react';
import Output from './Output';
import Compilation from './Compilation';
import { CODE_FILE_PANES } from 'config';

class CodeFilePane extends Component {
  render() {
    const { pane, stage, codeFile, changePane, code } = this.props;
    return (
      <React.Fragment>
        <Output stage={stage}
                code={code}
                codeFile={codeFile}
                shouldShow={pane === CODE_FILE_PANES.OUTPUT_TAB}
                hide={changePane}/>
        <Compilation stage={stage}
                code={code}
                codeFile={codeFile}
                shouldShow={pane === CODE_FILE_PANES.COMPILATION_TAB}
                hide={changePane}/>
      </React.Fragment>
    )
  }
}

export default CodeFilePane;
