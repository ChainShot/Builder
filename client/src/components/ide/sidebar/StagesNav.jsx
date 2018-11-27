import React, { Component } from 'react';
import { NavLink, withRouter, Route } from 'react-router-dom';
import CodeFilesNav from './CodeFilesNav';
import apiMutation from '../../../utils/api/mutation';
import './StagesNav.scss';

const mutation = `
mutation createStage($title: String, $containerId: String) {
  createStage(title: $title, containerId: $containerId, details: "", task: "", abiValidations: "") {
    id
    title
    containerId
  }
}
`;

class StagesNav extends Component {
  addStage() {
    const { stageContainer: { id } } = this.props;
    apiMutation(mutation, { title: 'Untitled', containerId: id });
  }
  render() {
    const { stageContainer: { stages }} = this.props;
    return (
      <ul className="stages-nav">
        { stages.map(stage => <StageNav key={stage.id} stage={stage} {...this.props} /> ) }
        <li>
          <a onClick={() => this.addStage()}>Add a Stage</a>
        </li>
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
