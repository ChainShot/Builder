import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './CodeFilesNav.scss';
import SkeletonsNav from './SkeletonsNav';
import CodeFilesNav from './CodeFilesNav';
import ValidationsNav from './ValidationsNav';
import SVG from '../../SVG';

class StageNav extends Component {
  render() {
    const { basename, stage } = this.props;
    const { codeFiles, projectSkeletons } = stage;
    return (
      <ul className="code-files-nav">
        <li>
          <NavLink to={`${basename}`} exact>
            <SVG name="wrench"/>
            <span>configuration</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={`${basename}/details`}>
            <SVG name="file"/>
            <span>details.md</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={`${basename}/task`}>
            <SVG name="file"/>
            <span>task.md</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={`${basename}/completion`}>
            <SVG name="file"/>
            <span>completion.md</span>
          </NavLink>
        </li>
        <ValidationsNav {...this.props} />
        <SkeletonsNav projectSkeletons={projectSkeletons} {...this.props} />
        <CodeFilesNav codeFiles={codeFiles} {...this.props} />
      </ul>
    )
  }
}

export default withRouter(StageNav);
