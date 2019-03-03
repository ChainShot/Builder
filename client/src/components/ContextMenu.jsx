import React, { Component } from 'react';
import './ContextMenu.scss';
import { cancel } from 'utils/contextMenu';

class ContextMenu extends Component {
  shortcut = (evt) => {
    if(evt.keyCode === 27) {
      cancel();
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.shortcut);
    document.addEventListener('click', this.cancelOnOuter);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.shortcut);
    document.removeEventListener('click', this.cancelOnOuter);
  }
  cancelOnOuter = (evt) => {
    if(!this.refs.menu.contains(evt.target)) {
      cancel();
    }
  }
  render() {
    const { x, y } = this.props;
    const style = { top: y, left: x }
    return (
      <div className="context-menu" style={style} ref="menu">
        { this.props.children }
      </div>
    )
  }
}

export default ContextMenu;
