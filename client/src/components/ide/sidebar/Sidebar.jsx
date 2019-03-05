import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import StagesNav from './StagesNav';
import ContainerNav from './ContainerNav';
import Resizable from 're-resizable';
import './Sidebar.scss';

const LOCALSTORAGE_SIEDBAR = 'ui-settings:sidebar';
const DEFAULT_SIZE = { width: 225, height: '100%' }
const MIN_WIDTH = 200;
const MAX_WIDTH = 800;
const DIRECTIONS = { top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }

function setSidebarSize(width, height = "100%") {
  localStorage.setItem(LOCALSTORAGE_SIEDBAR, JSON.stringify({
    width,
    height,
  }));
}

function getSidebarSize() {
  let data = localStorage.getItem(LOCALSTORAGE_SIEDBAR);
  try {
    if(data) return JSON.parse(data);
  }
  catch(ex) {
    console.warn(`Could not parse ${data}`);
  }
}

const s = n => n === 1 ? '' : 's';
class Sidebar extends Component {
  onResizeStop(evt, dir, ref) {
    setSidebarSize(ref.style.width);
    // monaco editor will automatically readjust on resize
    window.dispatchEvent(new Event('resize'));
  }
  render() {
    const { stageContainer } = this.props;
    const { stages } = stageContainer;
    const defaultSize = getSidebarSize() || DEFAULT_SIZE;
    return (
        <Resizable className="stage-container-sidebar"
          defaultSize={defaultSize}
          enable={DIRECTIONS}
          onResizeStop={this.onResizeStop}
          handleStyles={{ right: { right: '0' } }}
          minWidth={MIN_WIDTH}
          maxWidth={MAX_WIDTH}>
          <ContainerNav stageContainer={stageContainer}/>
          <div className="stages">
            <label>{stages.length} Stage{s(stages.length)}</label>
            <StagesNav stageContainer={stageContainer} />
          </div>
        </Resizable>
    )
  }
}

export default withRouter(Sidebar);
