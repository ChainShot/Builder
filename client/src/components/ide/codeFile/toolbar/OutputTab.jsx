import React, { Component } from 'react';
import SVG from '../../../SVG';
const TAB_NAME = 'output';

class OutputTab extends Component {
  render() {
    const { codeFile, changePane, pane } = this.props;
    const classes = [];
    if(pane === TAB_NAME) classes.push('active');
    return (
      <li className={classes.join(' ')}
          onClick={() => changePane(TAB_NAME)}>
        <SVG name="play"/>
        <div>Output</div>
      </li>
    )
  }
}

export default OutputTab;
