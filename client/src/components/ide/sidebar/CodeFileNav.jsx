import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import SVG from 'components/SVG';
import CodeFileOptionsNav from './CodeFileOptionsNav';
import "./CodeFileNav.scss";
import { connect } from 'react-redux';
import { openCodeFile, closeCodeFile } from 'redux/actions';

class CodeFileNav extends Component {
  openCodeFile = () => {
    const { stage, codeFile } = this.props;
    this.props.openCodeFile(stage.id, codeFile.id);
  }
  closeCodeFile = () => {
    const { stage, codeFile } = this.props;
    this.props.closeCodeFile(stage.id, codeFile.id);
  }
  render() {
    const { codeFile, stage, sidebarState: {codeFilesOpen}} = this.props;
    const opened = codeFilesOpen.find(x => x.stageId === stage.id && x.id === codeFile.id);
    if(opened) {
      return (
        <li className="code-file-nav">
          <div className="code-file-main" onClick={this.closeCodeFile}>
            <SVG name="codefile"/>
            <span>{ codeFile.name }</span>
          </div>
          <CodeFileOptionsNav stage={stage} codeFile={codeFile} />
        </li>
      )
    }
    return (
      <li className="code-file-nav">
        <div className="code-file-main" onClick={this.openCodeFile}>
          <SVG name="codefile"/>
          <span>{ codeFile.name }</span>
        </div>
      </li>
    )
  }
}

const mapStateToProps = ({ sidebarState }) => ({ sidebarState });

const mapDispatchToProps = { openCodeFile, closeCodeFile }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeFileNav);
