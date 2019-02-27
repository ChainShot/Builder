import React, { Component } from 'react';
import './Tab.scss';
import { IDE_TAB_TYPES } from 'config';
import SVG from 'components/SVG';

class Tab extends Component {
  setActive = () => {
    const { isActive } = this.props;
    if(!isActive) {
      this.props.setActive();
    }
  }
  closeTab = () => {
    this.props.closeTab();
  }
  render() {
    const { tab: { stageId, type, id }, stageContainer, isActive } = this.props;
    const stage = stageContainer.stages.find(x => x.id === stageId);
    const classes = ['ide-tab'];
    if(isActive) {
      classes.push('active');
    }
    let display;
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
        break;
      }
      case IDE_TAB_TYPES.STAGE_TASK: {
        display = `task.md`;
        break;
      }
      case IDE_TAB_TYPES.STAGE_COMPLETION: {
        display = `completion.md`;
        break;
      }
      case IDE_TAB_TYPES.STAGE_VALIDATIONS: {
        display = `validations.md`;
        break;
      }
      case IDE_TAB_TYPES.CODE_FILE_CONFIG: {
        const codeFile = stage.codeFiles.find(x => x.id === id);
        classes.push('config-tab');
        display = `${codeFile.name} Configuration`;
        break;
      }
      case IDE_TAB_TYPES.CODE_FILE_SOLUTION: {
        const codeFile = stage.codeFiles.find(x => x.id === id);
        display = `${codeFile.name} Solution`;
        break;
      }
      case IDE_TAB_TYPES.CODE_FILE_INITIAL_CODE: {
        const codeFile = stage.codeFiles.find(x => x.id === id);
        display = `${codeFile.name} Initial Code`;
        break;
      }
    }
    return (
      <div className={classes.join(' ')} onClick={this.setActive}>
        <div>{ display }</div>
        <SVG name="times" className="close" onClick={this.closeTab}/>
      </div>
    )
  }
}

export default Tab;
