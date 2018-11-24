import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './StageSidebar.scss';

class StageSidebar extends Component {
  render() {
    const { stage } = this.props;
    return (
      <div className="stage-sidebar">
        <ul className="files">
          <li>
            <NavLink to="config" activeClassName="active">
              Configuration
            </NavLink>
          </li>
          {stage.codeFiles.map(({id, name}) => (
            <li>
              <NavLink to={id}>
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default StageSidebar;
