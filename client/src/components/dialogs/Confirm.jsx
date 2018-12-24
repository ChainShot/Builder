import React, { Component } from 'react';
import Dialog from '../Dialog';
import { close } from '../../utils/dialog';
import './Confirm.scss';

const DEFAULT_MESSAGE = 'Are you sure?';

class Confirm extends Component {
  onSubmit = (evt) => {
    evt.preventDefault();
    const { onClose } = this.props;
    onClose(true);
    close();
  }
  cancel = () => {
    const { onClose } = this.props;
    onClose();
    close();
  }
  render() {
    const message = this.props.message || DEFAULT_MESSAGE;
    return (
      <Dialog title="Confirm" className="confirm-dialog">
        <form onSubmit={this.onSubmit}>
          <div className="message">
            { message }
          </div>
          <div className="actions">
            <div className="cancel btn btn-default" onClick={this.cancel}>
              No
            </div>
            <div className="submit btn btn-primary" onClick={this.onSubmit}>
              Yes
            </div>
          </div>
        </form>
      </Dialog>
    );
  }
}

export default Confirm;
