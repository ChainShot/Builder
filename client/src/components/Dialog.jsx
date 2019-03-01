import React, { Component } from 'react';
import { cancel } from '../utils/dialog';
import './Dialog.scss';

class Dialog extends Component {
  shortcut = (evt) => {
    if(evt.keyCode === 27) {
      this.cancelMe();
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.shortcut)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.shortcut)
  }
  cancelMe() {
    const { onClose } = this.props;
    if(onClose) {
      onClose();
    }
    cancel();
  }
  render() {
    const { title, className } = this.props;
    const classes = (className || "").split(' ').concat(['dialog']).join(' ');
    return (
      <React.Fragment>
        <div className={classes}>
          <div className="heading">
            <div className="title">{ title || 'Dialog' }</div>
            <div className="close" onClick={() => this.cancelMe()}></div>
          </div>
          <div className="content">
            { this.props.children }
          </div>
        </div>
        <div className="dialog-overlay" onClick={() => this.cancelMe()} />
      </React.Fragment>
    );
  }
}

export default Dialog;
