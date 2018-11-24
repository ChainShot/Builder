import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

class Sidebar extends Component {
  render() {
    const { stageContainer } = this.props;
    return (
      <div className="stage-container-sidebar">
        <ul className="stages">
          <li>
            <NavLink to="config">
              Configuration
            </NavLink>
          </li>
          <li>
            <NavLink to="intro">
              Intro.md
            </NavLink>
          </li>
          {stageContainer.stages.map(({id, title}) => (
            <li>
              <NavLink to={id}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Sidebar;
