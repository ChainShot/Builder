import React, { Component } from 'react';
import apiMutation from '../../../utils/api/mutation';
import modifyCodeFile from '../../../mutations/codeFile/modify';
import modifySolution from '../../../mutations/solution/modify';
import { withRouter } from 'react-router-dom';
import CodeFileConfig from '../configuration/CodeFileConfig';
import CodeFileEditor from './CodeFileEditor';
import PropsRoute from '../../PropsRoute';
import './CodeFile.scss';

class CodeFile extends Component {
  getCodeFile() {
    const { match: { params: { codeFileId } }, stage } = this.props;
    return stage.codeFiles.find(x => x.id === codeFileId);
  }
  getSolution() {
    const { match: { params: { codeFileId } }, stage } = this.props;
    return stage.solutions.find(x => x.codeFileId === codeFileId);
  }
  updateCode(code) {
    const { id } = this.getCodeFile();
    apiMutation(modifyCodeFile, { id, initialCode: code });
  }
  updateSolution(code) {
    const { id } = this.getSolution();
    apiMutation(modifySolution, { id, code });
  }
  render() {
    const { match: { url } } = this.props;
    const codeFile = this.getCodeFile();
    const solution = this.getSolution();
    const { stage } = this.props;
    const { initialCode, mode } = codeFile;
    const { code } = solution;
    if(!codeFile) return null;
    return (
      <div className="code-file">
        <PropsRoute path={`${url}/`} exact component={CodeFileEditor}
              codeFile={codeFile} stage={stage} code={initialCode} mode={mode}
              onUpdate={(code) => this.updateCode(code)}/>
        <PropsRoute path={`${url}/solution`} exact component={CodeFileEditor}
              codeFile={codeFile} stage={stage} code={code} mode={mode}
              onUpdate={(code) => this.updateSolution(code)}/>
        <PropsRoute path={`${url}/config`} component={CodeFileConfig} codeFile={codeFile} />
      </div>
    )
  }
}

export default withRouter(CodeFile);
