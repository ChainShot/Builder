import React, { Component } from 'react';
import SVG from '../../../SVG';
import { CODE_FILE_PANES } from 'config';

const TAB_NAME = CODE_FILE_PANES.COMPILATION_TAB;
const COMPILE_REGEX = /\w*(\.sol|\.v\.py)$/;

class CompilationTab extends Component {
  render() {
    const { codeFile, changePane, pane } = this.props;
    const classes = [];
    const isActive = (pane === TAB_NAME);
    if(isActive) classes.push('active');
    if(COMPILE_REGEX.test(codeFile.name)) {
      return (
        <li className={classes.join(' ')}
            onClick={() => changePane(isActive ? '' : TAB_NAME)}>
          <SVG name="code"/>
          <div>Compilation</div>
        </li>
      )
    }
    return null;
  }
}

export default CompilationTab;
