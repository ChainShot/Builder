import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IDE_TAB_TYPES } from 'config';
import UpdateWrapper from 'components/UpdateWrapper';
import CodeFileConfig from './configuration/CodeFileConfig';
import './Editor.scss';

class Editor extends Component {
  render() {
    const { ideState: { activeTabIdx, tabsOpen }, stageContainer } = this.props;
    const activeTab = tabsOpen[activeTabIdx];
    if(!activeTab) return null;
    return (
      <div className="editor">
        <EditorPane activeTab={activeTab} stageContainer={stageContainer}/>
      </div>
    )
  }
}

class EditorPane extends Component {
  render() {
    const { stageContainer, activeTab } = this.props;
    const stage = stageContainer.stages.find(x => x.id === activeTab.stageId);
    switch (activeTab.type) {
      case IDE_TAB_TYPES.CODE_FILE_CONFIG: {
        const codeFile = stage.codeFiles.find(x => x.id === activeTab.id);
        return <UpdateWrapper child={CodeFileConfig} codeFile={codeFile} stage={stage} />
      }
      case IDE_TAB_TYPES.CODE_FILE_SOLUTION: {
        const codeFile = stage.codeFiles.find(x => x.id === activeTab.id);
        return (
          <div className="ide-tab">
            Code File Solution
          </div>
        )
      }
      case IDE_TAB_TYPES.CODE_FILE_INITIAL_CODE: {
        const codeFile = stage.codeFiles.find(x => x.id === activeTab.id);
        return (
          <div className="ide-tab">
            Code File Initial Code
          </div>
        )
      }
    }
    return null;
  }
}

const mapStateToProps = ({ ideState }) => ({ ideState });

export default connect(
  mapStateToProps,
)(Editor);
