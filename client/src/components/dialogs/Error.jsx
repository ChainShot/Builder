import React, { Component } from 'react';
import Dialog from '../Dialog';
import SVG from '../../components/SVG';
import { close } from '../../utils/dialog';
import { SLACK_INVITE } from '../../config';
import './Error.scss';

const DEFAULT_MESSAGE = 'Oof. An unexpected error occurred. Just now.';

class Error extends Component {
  slack = () => {
    window.open(SLACK_INVITE, "_blank");
    close();
  }
  cancel = () => {
    close();
  }
  render() {
    const message = this.props.message || DEFAULT_MESSAGE;
    return (
      <Dialog title="An Error Occurred" className="error-dialog">
        <form onSubmit={this.onSubmit}>
          <div className="message">
            { message }
          </div>
          <div className="actions">
            <div className="cancel btn btn-default" onClick={this.slack}>
              <SVG name="slack" />
              Jump on Slack for Help
            </div>
            <div className="submit btn btn-primary" onClick={this.cancel}>
              Close
            </div>
          </div>
        </form>
      </Dialog>
    );
  }
}

export default Error;
