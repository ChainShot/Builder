import React, { Component } from 'react';
import SVG from '../../SVG';
import './CodeFileOptionsNav.scss';
import { IDE_TAB_TYPES } from 'config';
import { connect } from 'react-redux';
import { openTab } from 'redux/actions';
import equalObjects from 'utils/equalObjects';

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
          openTab={() => this.openTab(solutionAttrs)}
          isActive={equalObjects(activeTab, solutionAttrs)}
          codeFile={codeFile} />
        <InitialCodeNav
          isActive={equalObjects(activeTab, initialCodeAttrs)}
          openTab={() => this.openTab(initialCodeAttrs)} />
        <ConfigurationNav
          isActive={equalObjects(activeTab, configAttrs)}
          openTab={() => this.openTab(configAttrs)} />
      </ul>
    )
  }
}

class SolutionNav extends Component {
  render() {
    const { codeFile, openTab, isActive } = this.props;
    const classes = ['tab-opener'];
    if(isActive) classes.push('active');
    if(codeFile.hasProgress) {
      return (
        <li>
          <div className={classes.join(' ')}
            onClick={openTab}
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
    const { openTab, isActive } = this.props;
    const classes = ['tab-opener'];
    if(isActive) classes.push('active');
    return (
      <li>
        <div className={classes.join(' ')}
          onClick={openTab}
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
    const { openTab, isActive } = this.props;
    const classes = ['tab-opener'];
    if(isActive) classes.push('active');
    return (
      <li>
        <div className={classes.join(' ')}
          onClick={openTab}>
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
