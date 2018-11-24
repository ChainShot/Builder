import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './Sidebar.scss';

class Sidebar extends Component {
  render() {
    const { stageContainer, basename } = this.props;
    return (
      <div className="stage-container-sidebar">
        <ul className="stages">
          <li>
            <NavLink to={`${basename}/config`}>
              Configuration
            </NavLink>
          </li>
          <li>
            <NavLink to={`${basename}/intro`}>
              Intro.md
            </NavLink>
          </li>
          {stageContainer.stages.map(({id, title}) => (
            <li key={id}>
              <NavLink to={`${basename}/stage/${id}`}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default withRouter(Sidebar);
