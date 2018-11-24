import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './StageSidebar.scss';

class StageSidebar extends Component {
  render() {
    const { stage, basename } = this.props;
    return (
      <div className="stage-sidebar">
        <ul className="files">
          <li>
            <NavLink to={`${basename}/config`}>
              Configuration
            </NavLink>
          </li>
          {stage.codeFiles.map(({id, name}) => (
            <li key={id}>
              <NavLink to={`${basename}/${id}`}>
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
