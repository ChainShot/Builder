import React, { Component } from 'react';
import { NavLink, withRouter, Route } from 'react-router-dom';
import CodeFilesNav from './CodeFilesNav';
import './StagesNav.scss';

class StagesNav extends Component {
  render() {
    const { stageContainer: { stages }} = this.props;
    return (
      <ul className="stages-nav">
        { stages.map(stage => <StageNav key={stage.id} stage={stage} {...this.props} /> ) }
      </ul>
    )
  }
}

class StageNav extends Component {
  render() {
    const { basename, stage: { id, title }} = this.props;
    const path = `${basename}/stage/${id}`;
    return (
      <li>
        <NavLink to={path}> {title} </NavLink>
        <Route path={path} children={({ match }) => (match && <CodeFilesNav {...this.props} basename={path} />)} />
      </li>
    )
  }
}

export default StagesNav;
