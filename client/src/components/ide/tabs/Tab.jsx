import React, { Component } from 'react';
import './Tab.scss';
import { IDE_TAB_TYPES } from 'config';
import SVG from 'components/SVG';
import TabContextMenu from './TabContextMenu';
import * as ContextMenu from 'utils/contextMenu';

class Tab extends Component {
  setActive = () => {
    const { isActive } = this.props;
    if(!isActive) {
      this.props.setActive();
    }
  }
  closeTab = (evt) => {
    this.props.closeTab();
    evt.stopPropagation();
  }
  contextmenu = (evt) => {
    evt.preventDefault();
    const { closeOtherTabs, closeTabsToTheRight } = this.props;
    ContextMenu.open(TabContextMenu,
      { x: evt.clientX, y: evt.clientY },
      { closeTabsToTheRight, closeOtherTabs });
    return false;
  }
  componentDidMount() {
    this.refs.tab.addEventListener('contextmenu', this.contextmenu, false);
  }
  componentWillUnmount() {
    this.refs.tab.removeEventListener('contextmenu', this.contextmenu);
  }
  render() {
    const { tab: { stageId, type, id }, tabsOpen, stageContainer, isActive } = this.props;
    const stage = stageContainer.stages.find(x => x.id === stageId);
    const classes = ['ide-tab'];
    if(isActive) {
      classes.push('active');
    }
    let display;
    const isCrossStage = tabsOpen.reduce((uniq, tab) => {
      if(!uniq.find(x => x.stageId === tab.stageId)) {
        uniq.push(tab);
      }
      return uniq;
    }, []).length > 1;
    let stageSpecific;
    switch (type) {
      case IDE_TAB_TYPES.STAGE_CONTAINER_INTRO: {
        display = `intro.md`;
        break;
      }
      case IDE_TAB_TYPES.SKELETON_CONFIG: {
        const projectSkeletons = stage.projectSkeletons.find(x => x.id === id);
        classes.push('config-tab');
        display = `${projectSkeletons.title} Configuration`;
        break;
      }
      case IDE_TAB_TYPES.BADGE_CONFIG: {
        const badgeType = stageContainer.stageContainerGroup.badgeTypes.find(x => x.id === id);
        classes.push('config-tab');
        display = `${badgeType.name} Configuration`;
        break;
      }
      case IDE_TAB_TYPES.STAGE_CONTAINER_CONFIG: {
        display = `${stageContainer.stageContainerGroup.title} Configuration`;
        classes.push('config-tab');
        break;
      }
      case IDE_TAB_TYPES.STAGE_CONFIG: {
        display = `${stage.title} Configuration`;
        classes.push('config-tab');
        break;
      }
      case IDE_TAB_TYPES.STAGE_DETAILS: {
        display = `details.md`;
        stageSpecific = true;
        break;
      }
      case IDE_TAB_TYPES.STAGE_TASK: {
        display = `task.md`;
        stageSpecific = true;
        break;
      }
      case IDE_TAB_TYPES.STAGE_COMPLETION: {
        display = `completion.md`;
        stageSpecific = true;
        break;
      }
      case IDE_TAB_TYPES.STAGE_VALIDATIONS: {
        display = `validations.json`;
        stageSpecific = true;
        break;
      }
      case IDE_TAB_TYPES.CODE_FILE_CONFIG: {
        const codeFile = stage.codeFiles.find(x => x.id === id);
        classes.push('config-tab');
        stageSpecific = true;
        display = `${codeFile.name} Configuration`;
        break;
      }
      case IDE_TAB_TYPES.CODE_FILE_SOLUTION: {
        const codeFile = stage.codeFiles.find(x => x.id === id);
        stageSpecific = true;
        display = `${codeFile.name} Solution`;
        break;
      }
      case IDE_TAB_TYPES.CODE_FILE_INITIAL_CODE: {
        const codeFile = stage.codeFiles.find(x => x.id === id);
        stageSpecific = true;
        display = `${codeFile.name} Initial Code`;
        break;
      }
      default:
        return null;
    }
    let tabName = display;
    if(isCrossStage && stageSpecific) {
      tabName = `${stage.title} - ${tabName}`
    }
    return (
      <div className={classes.join(' ')} onClick={this.setActive} ref="tab">
        <div className="name"> {tabName} </div>
        <SVG name="times" className="close" onClick={this.closeTab}/>
      </div>
    )
  }
}

export default Tab;
