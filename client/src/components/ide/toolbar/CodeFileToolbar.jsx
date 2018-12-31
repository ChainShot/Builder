import React, { Component } from 'react';
import SaveToolbar from './SaveToolbar';
import CodeToolbar from './CodeToolbar';
import SVG from '../../SVG';
import { READ_THE_DOCS } from '../../../config';
import { withRouter } from 'react-router-dom';

class CodeFileToolbar extends Component {
  getStage() {
    const { match: { params: { stageId } }, stageContainer } = this.props;
    return stageContainer.stages.find(x => x.id === stageId);
  }
  getCodeFile(stage) {
    const { match: { params: { codeFileId } } } = this.props;
    return stage.codeFiles.find(x => x.id === codeFileId);
  }
  render() {
    const stage = this.getStage();
    const codeFile = this.getCodeFile(stage);
    return (
      <React.Fragment>
        <SaveToolbar />
        <CodeToolbar codeFile={codeFile}/>
        <li className="docs">
          <a href={`${READ_THE_DOCS}/content.html`} target="_blank" rel="noopener noreferrer">
            <SVG name="book" />
            <div> CodeFile Docs </div>
          </a>
        </li>
      </React.Fragment>
    )
  }
}

export default withRouter(CodeFileToolbar);
