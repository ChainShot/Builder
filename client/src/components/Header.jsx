import React, { Component } from 'react';
import logotype from '../svgs/logotype.svg';
import './Header.scss';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <img src={logotype} />
        <ul>
          <li>
            <NavLink to="/blocks" exact>
              Building Blocks
            </NavLink>
          </li>
          <li>
            <NavLink to="/lessons">
              Lessons
            </NavLink>
          </li>
          <li>
            <NavLink to="/challenges">
              Challenges
            </NavLink>
          </li>
        </ul>
      </div>
    )
  }
}

export default Header;
