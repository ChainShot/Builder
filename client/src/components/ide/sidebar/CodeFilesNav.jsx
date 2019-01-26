import React, { Component } from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import CodeFileOptionsNav from './CodeFileOptionsNav';
import './CodeFilesNav.scss';
import * as dialog from '../../../utils/dialog';
import AddCodeFile from './AddCodeFile';
import AddSkeleton from './AddSkeleton';
import SVG from '../../SVG';

const VALIDATION_LANGUAGES = ['vyper', 'solidity'];

class CodeFilesNav extends Component {
  renderValidations() {
    const { basename, stage } = this.props;
    if(VALIDATION_LANGUAGES.indexOf(stage.language) >= 0) {
      return (
        <li>
          <NavLink to={`${basename}/validations`}>
            <SVG name="file"/>
            <span>validations.json</span>
          </NavLink>
        </li>
      )
    }
  }
  addCodeFile = () => {
    const { stage, stageContainer } = this.props;
    dialog.open(AddCodeFile, { stage, stageContainer }).then((id) => {
      const { basename } = this.props;
      this.props.history.push(`${basename}/file/${id}`);
    });
  }
  renderAddCodeFile() {
    const { stage: { type } } = this.props;
    if(type === 'CodeStage') {
      return (
        <li>
          <div className="action" onClick={this.addCodeFile}>
            <SVG name="file-plus"/>
            <span>add code file…</span>
          </div>
        </li>
      )
    }
  }
  renderAddSkeleton() {
    const { stage } = this.props;
    const { type } = stage;
    if(type === 'DownloadStage') {
      return (
        <li>
          <div className="action" onClick={() => dialog.open(AddSkeleton, { stage })}>
            <SVG name="skeleton"/>
            <span>add skeleton…</span>
          </div>
        </li>
      )
    }
  }
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
        { this.renderValidations() }
        { (projectSkeletons || []).map(ps => <SkeletonNav key={ps.id} skeleton={ps} {...this.props} />) }
        { (codeFiles || []).map(cf => <CodeFileNav key={cf.id} codeFile={cf} {...this.props} />) }
        { this.renderAddCodeFile() }
        { this.renderAddSkeleton() }
      </ul>
    )
  }
}

class SkeletonNav extends Component {
  render() {
    const { basename, skeleton } = this.props;
    const { title, id } = skeleton;
    const path = `${basename}/skeleton/${id}`;
    return (
      <li>
        <NavLink to={path}>
          <SVG name="skeleton"/>
          <span>{ title }</span>
        </NavLink>
      </li>
    )
  }
}

class CodeFileNav extends Component {
  render() {
    const { basename, codeFile } = this.props;
    const { name, id } = codeFile;
    const path = `${basename}/file/${id}`;
    return (
      <li>
        <NavLink to={path}>
          <SVG name="codefile"/>
          <span>{ name }</span>
        </NavLink>
        <Route path={path} children={({ match }) => (match && <CodeFileOptionsNav {...this.props} basename={path} codeFile={codeFile} />)} />
      </li>
    )
  }
}

export default withRouter(CodeFilesNav);
