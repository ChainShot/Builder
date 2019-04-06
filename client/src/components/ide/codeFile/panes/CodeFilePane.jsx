import React, { Component } from 'react';
import Output from './Output';
import Compilation from './Compilation';
import { CODE_FILE_PANES } from 'config';
import Resizable from 're-resizable';
import "./CodeFilePane.scss";

const LOCALSTORAGE_PANE = 'ui-settings:code-file-pane';
const DEFAULT_SIZE = { width: '100%', height: 300 }
const MIN_HEIGHT = 200;
const MAX_HEIGHT = 600;
const DIRECTIONS = { top:true, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }

function setPaneSize(height, width = "100%") {
  localStorage.setItem(LOCALSTORAGE_PANE, JSON.stringify({
    width,
    height,
  }));
}

function getPaneSize() {
  let data = localStorage.getItem(LOCALSTORAGE_PANE);
  try {
    if(data) return JSON.parse(data);
  }
  catch(ex) {
    console.warn(`Could not parse ${data}`);
  }
}

class CodeFilePane extends Component {
  onResizeStop(evt, dir, ref) {
    setPaneSize(ref.style.height);
    // resize event for the monaco display
    window.requestAnimationFrame(() => window.dispatchEvent(new CustomEvent('resize')));
  }
  render() {
    const { pane, stage, codeFile, changePane, code } = this.props;
    const defaultSize = getPaneSize() || DEFAULT_SIZE;
    if([CODE_FILE_PANES.OUTPUT_TAB, CODE_FILE_PANES.COMPILATION_TAB].indexOf(pane) < 0) {
      return null;
    }
    return (
      <Resizable 
        class="code-file-pane"
        defaultSize={defaultSize}
        enable={DIRECTIONS}
        onResizeStop={this.onResizeStop}
        minHeight={MIN_HEIGHT}
        maxHeight={MAX_HEIGHT}>
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
      </Resizable>
    )
  }
}

export default CodeFilePane;
