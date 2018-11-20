import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class RelativeLink extends Component {
  handleClick() {
    const { to, keepParts, location: { pathname }} = this.props;
    const lastChar = pathname[pathname.length - 1];
    let openPath = (lastChar === '/') ? pathname.slice(0, -1) : pathname;
    if(keepParts) {
      openPath = openPath.split("/").slice(0, keepParts).join("/");
    }
    const destination = (to[0] === '/') ? to.slice(1) : to;
    this.props.history.push(`${openPath}/${to}`);
  }
  render() {
    return (
      <a onClick={() => this.handleClick()}>
        { this.props.children }
      </a>
    )
  }
}

export default withRouter(RelativeLink);
