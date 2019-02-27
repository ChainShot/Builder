import React, { Component } from 'react';
import './CodeFilesNav.scss';
import SkeletonsNav from './SkeletonsNav';
import CodeFilesNav from './CodeFilesNav';
import ValidationsNav from './ValidationsNav';
import SVG from 'components/SVG';
import { openTab } from 'redux/actions';
import { connect } from 'react-redux';
import { IDE_TAB_TYPES } from 'config';
import equalObjects from 'utils/equalObjects';

class StageNav extends Component {
  openTab = ({ stageId, type, id }) => {
    this.props.openTab(stageId, type, id);
  }
  attributesFor(type) {
    const { stage } = this.props;
    return { stageId: stage.id, type, id: null }
  }
  render() {
    const { stage, ideState: { tabsOpen, activeTabIdx } } = this.props;
    const { codeFiles, projectSkeletons } = stage;
    const activeTab = tabsOpen[activeTabIdx];
    const configurationAttrs = this.attributesFor(IDE_TAB_TYPES.STAGE_CONFIG);
    const detailsAttrs = this.attributesFor(IDE_TAB_TYPES.STAGE_DETAILS);
    const taskAttrs = this.attributesFor(IDE_TAB_TYPES.STAGE_TASK);
    const completionAttrs = this.attributesFor(IDE_TAB_TYPES.STAGE_COMPLETION);
    return (
      <ul className="code-files-nav">
        <ActionNav
          isActive={equalObjects(activeTab, configurationAttrs)}
          openTab={() => this.openTab(configurationAttrs)}>
          <SVG name="wrench"/>
          <span>configuration</span>
        </ActionNav>
        <ActionNav
          isActive={equalObjects(activeTab, detailsAttrs)}
          openTab={() => this.openTab(detailsAttrs)}>
          <SVG name="file"/>
          <span>details.md</span>
        </ActionNav>
        <ActionNav
          isActive={equalObjects(activeTab, taskAttrs)}
          openTab={() => this.openTab(taskAttrs)}>
          <SVG name="file"/>
          <span>task.md</span>
        </ActionNav>
        <ActionNav
          isActive={equalObjects(activeTab, completionAttrs)}
          openTab={() => this.openTab(completionAttrs)}>
          <SVG name="file"/>
          <span>completion.md</span>
        </ActionNav>
        <ValidationsNav {...this.props} />
        <SkeletonsNav projectSkeletons={projectSkeletons} stage={stage} />
        <CodeFilesNav codeFiles={codeFiles} {...this.props} />
      </ul>
    )
  }
}

class ActionNav extends Component {
  render() {
    const { openTab, isActive } = this.props;
    const classes = ['action'];
    if(isActive) classes.push('active');
    return (
      <li>
        <div className={classes.join(' ')} onClick={openTab}>
          { this.props.children }
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
)(StageNav);
