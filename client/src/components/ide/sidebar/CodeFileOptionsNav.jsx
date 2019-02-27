import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SVG from '../../SVG';
import './CodeFileOptionsNav.scss';
import { IDE_TAB_TYPES } from 'config';
import { connect } from 'react-redux';
import { openTab } from 'redux/actions';

function equalObjects(a,b) {
  if(!a || !b) return false;
  if(Object.keys(a).length !== Object.keys(b).length) return false;
  return Object.keys(a).reduce((bool, key) => {
    return bool && a[key] === b[key];
  }, true);
}

class CodeFileOptionsNav extends Component {
  openTab = ({ stageId, type, id }) => {
    this.props.openTab(stageId, type, id);
  }
  attributesFor(type) {
    const { codeFile, stage } = this.props;
    return {
      stageId: stage.id,
      id: codeFile.id,
      type,
    }
  }
  render() {
    const { codeFile, ideState: { tabsOpen, activeTabIdx }} = this.props;
    const activeTab = tabsOpen[activeTabIdx];
    const solutionAttrs = this.attributesFor(IDE_TAB_TYPES.CODE_FILE_SOLUTION);
    const initialCodeAttrs = this.attributesFor(IDE_TAB_TYPES.CODE_FILE_INITIAL_CODE);
    const configAttrs = this.attributesFor(IDE_TAB_TYPES.CODE_FILE_CONFIG);
    return (
      <ul className="code-file-options-nav">
        <SolutionNav
          tabAttributes={solutionAttrs}
          openTab={this.openTab}
          isActive={equalObjects(activeTab, solutionAttrs)}
          codeFile={codeFile} />
        <InitialCodeNav
          tabAttributes={initialCodeAttrs}
          isActive={equalObjects(activeTab, initialCodeAttrs)}
          openTab={this.openTab} />
        <ConfigurationNav
          tabAttributes={configAttrs}
          isActive={equalObjects(activeTab, configAttrs)}
          activeTab={activeTab}
          openTab={this.openTab} />
      </ul>
    )
  }
}

class SolutionNav extends Component {
  render() {
    const { codeFile, openTab, tabAttributes, isActive } = this.props;
    const classes = ['tab-opener'];
    if(isActive) classes.push('active');
    if(codeFile.hasProgress) {
      return (
        <li>
          <div className={classes.join(' ')}
            onClick={() => openTab(tabAttributes)}
            exact data-rh="Your Solution" data-rh-at="right">
            <SVG name="codefile"/>
            <span>solution</span>
          </div>
        </li>
      )
    }
    return null;
  }
}

class InitialCodeNav extends Component {
  render() {
    const { openTab, tabAttributes, isActive } = this.props;
    const classes = ['tab-opener'];
    if(isActive) classes.push('active');
    return (
      <li>
        <div className={classes.join(' ')}
          onClick={() => openTab(tabAttributes)}
          exact data-rh="User's Initial Code" data-rh-at="right">
          <SVG name="codefile"/>
          <span>initial code</span>
        </div>
      </li>
    )
  }
}

class ConfigurationNav extends Component {
  render() {
    const { openTab, tabAttributes, isActive } = this.props;
    const classes = ['tab-opener'];
    if(isActive) classes.push('active');
    return (
      <li>
        <div className={classes.join(' ')}
          onClick={() => openTab(tabAttributes)}>
          <SVG name="wrench"/>
          <span>configuration</span>
        </div>
      </li>
    )
  }
}

const mapStateToProps = ({ ideState }) => ({ ideState })

const mapDispatchToProps = { openTab }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeFileOptionsNav);
