import React, { Component } from 'react';
import SVG from '../../../SVG';
import { CODE_FILE_PANES } from 'config';

const TAB_NAME = CODE_FILE_PANES.OUTPUT_TAB;

class OutputTab extends Component {
  render() {
    const { changePane, pane } = this.props;
    const classes = [];
    const isActive = (pane === TAB_NAME);
    if(isActive) classes.push('active');
    return (
      <li className={classes.join(' ')}
          onClick={() => changePane(isActive ? '' : TAB_NAME)}>
        <SVG name="braces"/>
        <div>Test Output</div>
      </li>
    )
  }
}

export default OutputTab;
