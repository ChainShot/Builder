import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import StagesNav from './StagesNav';
import './Sidebar.scss';
import SVG from '../../SVG';

class Sidebar extends Component {
  render() {
    const { stageContainer: { stageContainerGroup: { title }, version, stages }, basename } = this.props;
    return (
      <div className="stage-container-sidebar">
        <ul className="top-options">
          <li className="title">
            <NavLink to={`${basename}`} exact>
              <SVG name="wrench"/>
              <span>{ title }: { version }</span>
            </NavLink>
          </li>
          <li className="intro">
            <NavLink to={`${basename}/intro`}>
              <SVG name="file"/>
              <span>intro.md</span>
            </NavLink>
          </li>
        </ul>
        <div className="stages">
          <label>Stages ( {stages.length} )</label>
          <StagesNav {...this.props} />
        </div>
      </div>
    )
  }
}

export default withRouter(Sidebar);
