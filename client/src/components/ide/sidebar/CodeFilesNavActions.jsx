import * as dialog from 'utils/dialog';
import AddCodeFile from './dialogs/codeFile/add/AddCodeFile';
import React, { Component } from 'react';
import { openTab, openCodeFile } from 'redux/actions';
import { connect } from 'react-redux';
import { IDE_TAB_TYPES } from 'config';
import SVG from 'components/SVG';

class CodeFilesNavActions extends Component {
  addCodeFile = () => {
    const { stage, stageContainer } = this.props;
    dialog.open(AddCodeFile, { stage, stageContainer }).then((id) => {
      this.props.openTab(stage.id, IDE_TAB_TYPES.CODE_FILE_CONFIG, id);
      this.props.openCodeFile(stage.id, id);
    });
  }
  render() {
    const { stage: { type } } = this.props;
    if(type === 'CodeStage') {
      return (
        <li>
          <div className="action" onClick={this.addCodeFile}>
            <SVG name="file-plus"/>
            <span>add code file…</span>
          </div>
        </li>
      )
    }
    return null;
  }
}

const mapDispatchToProps = { openTab, openCodeFile }

export default connect(
  null,
  mapDispatchToProps,
)(CodeFilesNavActions);
