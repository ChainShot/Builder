import React, { Component } from 'react';
import apiMutation from '../../utils/api/mutation';
import modifyCodeFile from '../../mutations/codeFile/modify';
import { withRouter } from 'react-router-dom';
import CodeFileConfig from './configuration/CodeFileConfig';
import CodeFileEditor from './code/CodeFileEditor';
import PropsRoute from '../PropsRoute';
import './CodeFile.scss';

class CodeFile extends Component {
  getCodeFile() {
    const { match: { params: { codeFileId } }, stage } = this.props;
    return stage.codeFiles.filter(x => x.id === codeFileId)[0];
  }
  updateCode(code) {
    const { id } = this.getCodeFile();
    apiMutation(modifyCodeFile, { id, initialCode: code });
  }
  render() {
    const { match: { url } } = this.props;
    const codeFile = this.getCodeFile();
    const { stage } = this.props;
    if(!codeFile) return null;
    return (
      <div className="code-file">
        <PropsRoute path={`${url}/config`} component={CodeFileConfig} codeFile={codeFile} />
        <PropsRoute path={`${url}/`} exact component={CodeFileEditor} codeFile={codeFile} stage={stage} onUpdate={(code) => this.updateCode(code)}/>
      </div>
    )
  }
}

export default withRouter(CodeFile);
