import React, { Component } from 'react';
import { NavLink, withRouter, Route } from 'react-router-dom';
import StagesNav from './StagesNav';
import './Sidebar.scss';

class Sidebar extends Component {
  render() {
    const { stageContainer: { stageContainerGroup: { title } }, basename } = this.props;
    return (
      <div className="stage-container-sidebar">
        <ul className="top-options">
          <li>
            <NavLink to={`${basename}/config`}>
              { title }
            </NavLink>
          </li>
          <li>
            <NavLink to={`${basename}/intro`}>
              Introduction
            </NavLink>
          </li>
        </ul>
        <div className="stages">
          <label>Stages</label>
          <StagesNav {...this.props} />
        </div>
      </div>
    )
  }
}

export default withRouter(Sidebar);
