import React, { Component } from 'react';
import './Tab.scss';
import { IDE_TAB_TYPES } from 'config';

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
  render() {
    const { tab: { stageId, type, id }, stageContainer } = this.props;
    const stage = stageContainer.stages.find(x => x.id === stageId);
    switch (type) {
      case IDE_TAB_TYPES.CODE_FILE_CONFIG: {
        const codeFile = stage.codeFiles.find(x => x.id === id);
        return (
          <div className="ide-tab">
            {codeFile.name} Configuration
          </div>
        )
      }
      case IDE_TAB_TYPES.CODE_FILE_SOLUTION: {
        const codeFile = stage.codeFiles.find(x => x.id === id);
        return (
          <div className="ide-tab">
            {codeFile.name} Solution
          </div>
        )
      }
      case IDE_TAB_TYPES.CODE_FILE_INITIAL_CODE: {
        const codeFile = stage.codeFiles.find(x => x.id === id);
        return (
          <div className="ide-tab">
            {codeFile.name} Initial Code
          </div>
        )
      }
    }
    return null;
  }
}

export default Tab;
