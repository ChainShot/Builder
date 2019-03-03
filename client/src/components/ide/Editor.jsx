import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Editor.scss';
import EditorPane from './EditorPane';

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

const mapStateToProps = ({ ideState }) => ({ ideState });

export default connect(
  mapStateToProps,
)(Editor);
