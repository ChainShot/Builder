import React, { Component } from 'react';
import logotype from '../svgs/logotype.svg';
import './Header.scss';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <img src={logotype} />
      </div>
    )
  }
}

export default Header;
