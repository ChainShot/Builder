import React, { Component } from 'react';
import './Tab.scss';
import { IDE_TAB_TYPES } from 'config';
import SVG from 'components/SVG';
import { connect } from 'react-redux';

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
    const { tab: { stageId, type, id }, ideState: { tabsOpen }, stageContainer, isActive } = this.props;
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
        display = `validations.md`;
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
    }
    let tabName = display;
    if(isCrossStage && stageSpecific) {
      tabName = `${stage.title} - ${tabName}`
    }
    return (
      <div className={classes.join(' ')} onClick={this.setActive}>
        <div> {tabName} </div>
        <SVG name="times" className="close" onClick={this.closeTab}/>
      </div>
    )
  }
}

const mapStateToProps = ({ ideState }) => ({ ideState })

export default connect(
  mapStateToProps
)(Tab);
