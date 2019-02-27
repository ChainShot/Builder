import React, { Component } from 'react';
import './Tab.scss';
import { IDE_TAB_TYPES } from 'config';
import SVG from 'components/SVG';

/*
  STAGE_CONTAINER_INTRO: 0,
  BADGE_CONFIG: 1,
  STAGE_CONFIG: 2,
  STAGE_TASK: 3,
  STAGE_DETAILS: 4,
  CODE_FILE_CONFIG: 5,
  CODE_FILE_INITIAL_CODE: 6,
  CODE_FILE_SOLUTION: 7,
  SKELETON_CONFIG: 8,
*/

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
