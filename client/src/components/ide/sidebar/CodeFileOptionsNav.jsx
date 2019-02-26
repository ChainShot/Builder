import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SVG from '../../SVG';
import './CodeFileOptionsNav.scss';
import { IDE_TAB_TYPES } from 'config';
import { connect } from 'react-redux';
import { openTab } from 'redux/actions';

class CodeFileOptionsNav extends Component {
  openTab(type) {
    const { codeFile, stage } = this.props;
    this.props.openTab(stage.id, type, codeFile.id);
  }
  renderSolution() {
    const { codeFile } = this.props;
    if(codeFile.hasProgress) {
      return (
        <li>
          <div className="tab-opener" onClick={() => this.openTab(IDE_TAB_TYPES.CODE_FILE_SOLUTION)}
            exact data-rh="Your Solution" data-rh-at="right">
            <SVG name="codefile"/>
            <span>solution</span>
          </div>
        </li>
      )
    }
  }
  render() {
    return (
      <ul className="code-file-options-nav">
        {this.renderSolution()}
        <li>
          <div className="tab-opener" onClick={() => this.openTab(IDE_TAB_TYPES.CODE_FILE_INITIAL_CODE)}
            exact data-rh="User's Initial Code" data-rh-at="right">
            <SVG name="codefile"/>
            <span>initial code</span>
          </div>
        </li>
        <li>
          <div className="tab-opener" onClick={() => this.openTab(IDE_TAB_TYPES.CODE_FILE_CONFIG)}>
            <SVG name="wrench"/>
            <span>configuration</span>
          </div>
        </li>
      </ul>
    )
  }
}

const mapDispatchToProps = { openTab }

export default connect(
  null,
  mapDispatchToProps,
)(CodeFileOptionsNav);
