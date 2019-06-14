import React, { Component } from 'react';
import './ContextMenu.scss';
import { cancel } from 'utils/contextMenu';

// use mousedown instead of click because firefox will trigger a click
// upon mouseup of the contextmenu event which is used to open this menu
const CLICK_EVENT = 'mousedown';
const KEY_EVENT = 'keydown';

class ContextMenu extends Component {
  shortcut = (evt) => {
    if(evt.keyCode === 27) {
      cancel();
    }
  }
  componentDidMount() {
    document.addEventListener(KEY_EVENT, this.shortcut);
    document.addEventListener(CLICK_EVENT, this.cancelOnOuter);
  }
  componentWillUnmount() {
    document.removeEventListener(KEY_EVENT, this.shortcut);
    document.removeEventListener(CLICK_EVENT, this.cancelOnOuter);
  }
  cancelOnOuter = (evt) => {
    if(!this.refs.menu.contains(evt.target)) {
      cancel();
    }
  }
  render() {
    const { x, y } = this.props;
    const style = { top: y }
    if(x > 0) {
      style.left = x;
    }
    else {
      style.right = Math.abs(x);
    }
    return (
      <div className="context-menu" style={style} ref="menu">
        { this.props.children }
      </div>
    )
  }
}

export default ContextMenu;
