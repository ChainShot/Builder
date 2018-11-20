import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// By default this component ensures that we close the url path and add to it
// e.g. a.com/stages or a.com/stages/ both will direct to a.com/stages/{to}
// this is especially useful in cases where the base url is dynamic
// additional options:
// keepParts - determines how many URL parts to keep, replaces the rest with /{to}
class RelativeLink extends Component {
  handleClick() {
    const { to, keepParts, location: { pathname }} = this.props;
    let openPath = getOpenPath(pathname);
    if(keepParts) {
      openPath = openPath.split("/").slice(0, keepParts).join("/");
    }
    const destination = (to[0] === '/') ? to.slice(1) : to;
    this.props.history.push(`${openPath}/${to}`);
  }
  render() {
    const { to, location: { pathname }} = this.props;
    const active = (pathname.indexOf(to) >= 0);
    return (
      <a className={active ? 'active' : ''} onClick={() => this.handleClick()}>
        { this.props.children }
      </a>
    )
  }
}

function getOpenPath(pathname) {
  const lastChar = pathname[pathname.length - 1];
  return (lastChar === '/') ? pathname.slice(0, -1) : pathname;
}

export default withRouter(RelativeLink);
