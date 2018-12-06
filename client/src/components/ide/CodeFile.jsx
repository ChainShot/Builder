import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import apiMutation from '../../utils/api/mutation';
import modifyCodeFile from '../../mutations/codeFile/modify';
import { withRouter } from 'react-router-dom';
import CodeFileConfig from './configuration/CodeFileConfig';
import PropsRoute from '../PropsRoute';
import './CodeFile.scss';

const CodeFileEditor = ({ codeFile: { initialCode, mode }, ...props}) => 
  <CodeEditor code={initialCode} mode={mode} {...props}/>

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
    const { initialCode, mode } = codeFile;
    return (
      <div className="code-file">
        <PropsRoute path={`${url}/config`} component={CodeFileConfig} codeFile={codeFile} />
        <PropsRoute path={`${url}/`} exact component={CodeFileEditor} codeFile={codeFile} onUpdate={(code) => this.updateCode(code)}/>
      </div>
    )
  }
}

export default withRouter(CodeFile);
