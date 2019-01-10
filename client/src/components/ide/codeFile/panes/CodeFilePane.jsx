import React, { Component } from 'react';
import Output from './Output';
import Compilation from './Compilation';

const OUTPUT_TAB = 'output';
const COMPILATION_TAB = 'compilation';

class CodeFileToolbarPane extends Component {
  render() {
    const { pane, stage, codeFile, changePane } = this.props;
    return (
      <React.Fragment>
        <Output stage={stage}
               codeFile={codeFile}
               shouldShow={pane === OUTPUT_TAB}
               hide={changePane}/>
        <Compilation stage={stage}
                codeFile={codeFile}
                shouldShow={pane === COMPILATION_TAB}
                hide={changePane}/>
      </React.Fragment>
    )
  }
}

export default CodeFileToolbarPane;
