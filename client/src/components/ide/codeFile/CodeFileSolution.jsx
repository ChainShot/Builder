import React, { Component } from 'react';
import apiMutation from '../../../utils/api/mutation';
import modifyCodeFile from '../../../mutations/codeFile/modify';
import modifySolution from '../../../mutations/solution/modify';
import UpdateWrapper from '../../UpdateWrapper';
import CodeFileConfig from '../configuration/CodeFileConfig';
import CodeFileEditor from './CodeFileEditor';

class CodeFileSolution extends Component {
  getSolution() {
    const { codeFile, stage } = this.props;
    return stage.solutions.find(x => x.codeFileId === codeFile.id);
  }
  updateSolution(code) {
    const { id } = this.getSolution();
    return apiMutation(modifySolution, { id, code });
  }
  render() {
    const { stage, codeFile } = this.props;
    const solution = this.getSolution();
    const { code } = solution;
    const { mode } = codeFile;
    const uniqueKey = `${codeFile.id}-${solution.id}`;
    return (
      <UpdateWrapper
        child={CodeFileEditor}
        key={uniqueKey}
        debounceKey={uniqueKey}
        savePromise={({ code }) => this.updateSolution(code)}
        onUpdate={(code) => this.updateSolution(code)}
        codeFile={codeFile} stage={stage} code={code} mode={mode} />
    )
  }
}

export default CodeFileSolution;
