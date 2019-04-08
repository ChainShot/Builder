import React, { Component } from 'react';
import Output from './Output';
import Compilation from './Compilation';
import { CODE_FILE_PANES } from 'config';
import Resizable from 're-resizable';
import "./CodeFilePane.scss";

const LOCALSTORAGE_PANE = 'ui-settings:code-file-pane';
const DEFAULT_SIZE = { width: '100%', height: 250 }
const MIN_HEIGHT = 150;
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
  constructor(props) {
    super(props);
    const defaultSize = getPaneSize() || DEFAULT_SIZE;
    console.log({ defaultSize })
    this.state = {
      size: defaultSize
    }
  }
  onResizeStop = (evt, dir, ref, delta) => {
    const { height, width } = this.state.size;
    const newHeight = height + delta.height;
    // don't store height values when hidden (below min height)
    if(newHeight >= MIN_HEIGHT) {
      console.log('setting', newHeight)
      setPaneSize(newHeight);
      this.setState({ size: { width, height: newHeight }});
    }
    // resize event for the monaco display
    window.requestAnimationFrame(() => window.dispatchEvent(new CustomEvent('resize')));
  }
  hide() {
    const { changePane } = this.props;
    changePane();
    // resize event for the monaco display
    window.requestAnimationFrame(() => window.dispatchEvent(new CustomEvent('resize')));
  }
  render() {
    const { pane, stage, codeFile, changePane, code } = this.props;
    const { size } = this.state;
    let minHeight = MIN_HEIGHT;
    let height = size.height;
    const width = size.width;
    if([CODE_FILE_PANES.OUTPUT_TAB, CODE_FILE_PANES.COMPILATION_TAB].indexOf(pane) < 0) {
      height = 0;
      minHeight = 0;
    }
    return (
      <Resizable 
        className='code-file-pane'
        size={{ height, width }}
        enable={DIRECTIONS}
        onResizeStop={this.onResizeStop}
        minHeight={minHeight}
        maxHeight={MAX_HEIGHT}>
        <Output stage={stage}
                code={code}
                codeFile={codeFile}
                shouldShow={pane === CODE_FILE_PANES.OUTPUT_TAB}
                hide={this.hide}/>
        <Compilation stage={stage}
                code={code}
                codeFile={codeFile}
                shouldShow={pane === CODE_FILE_PANES.COMPILATION_TAB}
                hide={this.hide}/>
      </Resizable>
    )
  }
}

export default CodeFilePane;
