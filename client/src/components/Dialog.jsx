import React, { Component } from 'react';
import { close } from '../utils/dialog';
import './Dialog.scss';

class Dialog extends Component {
  closeMe() {
    const { onClose } = this.props;
    if(onClose) {
      onClose();
    }
    close();
  }
  render() {
    const { title, className } = this.props;
    const classes = (className || "").split(' ').concat(['dialog']).join(' ');
    return (
      <React.Fragment>
        <div className={classes}>
          <div className="heading">
            <div className="title">{ title || 'Dialog' }</div>
            <div className="close" onClick={() => this.closeMe()}></div>
          </div>
          <div className="content">
            <form onSubmit={(evt) => evt.preventDefault()}>
              { this.props.children }
            </form>
          </div>
        </div>
        <div className="overlay" onClick={() => this.closeMe()} />
      </React.Fragment>
    );
  }
}

export default Dialog;
