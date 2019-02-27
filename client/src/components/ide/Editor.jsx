import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IDE_TAB_TYPES } from 'config';
import UpdateWrapper from 'components/UpdateWrapper';
import CodeFileConfig from './configuration/CodeFileConfig';
import CodeFileSolution from './codeFile/CodeFileSolution';
import CodeFile from './codeFile/CodeFile';
import Intro from './markdown/Intro';
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
      case IDE_TAB_TYPES.STAGE_CONTAINER_INTRO: {
        debugger;
        return (
          <Intro stageContainer={stageContainer} />
        )
      }
      case IDE_TAB_TYPES.CODE_FILE_CONFIG: {
        const codeFile = stage.codeFiles.find(x => x.id === activeTab.id);
        const uniqueKey = `${codeFile.id}-config`;
        return (
          <UpdateWrapper
            key={uniqueKey}
            debounceKey={uniqueKey}
            child={CodeFileConfig}
            codeFile={codeFile}
            stage={stage} />
        )
      }
      case IDE_TAB_TYPES.CODE_FILE_SOLUTION: {
        const codeFile = stage.codeFiles.find(x => x.id === activeTab.id);
        return (
          <CodeFileSolution stage={stage} codeFile={codeFile} />
        )
      }
      case IDE_TAB_TYPES.CODE_FILE_INITIAL_CODE: {
        const codeFile = stage.codeFiles.find(x => x.id === activeTab.id);
        return (
          <CodeFile stage={stage} codeFile={codeFile} />
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
