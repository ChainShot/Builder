import React, { Component } from 'react';
import logotype from '../svgs/logotype.svg';
import './Header.scss';
import { NavLink, Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/">
          <img src={logotype} alt="Logo" />
        </Link>
        <ul>
          <li>
            <NavLink to="/blocks">
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
