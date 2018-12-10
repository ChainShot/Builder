import React, {Component} from 'react';
import './Compilation.scss';
import * as compilers from '../../../../utils/api/compilers';
import CompilationDisplay from './CompilationDisplay';
import CompilationToolbar from './CompilationToolbar';

class Compilation extends Component {
  state = {
    output: null,
    compiling: false,
    auto: true,
  }
  compile = async () => {
    const { stage, codeFile } = this.props;
    const { language } = stage;

    let compiler;
    if(language === 'solidity') compiler = compilers.solc;
    else if(language === 'vyper') compiler = compilers.solc;

    if(compiler) {
      const { initialCode, name, hasProgress } = codeFile;
      let code = initialCode;
      if(hasProgress) {
        const solution = stage.solutions.find(x => x.codeFileId === codeFile.id);
        code = solution.code;
      }
      this.setState({ compiling: true });
      const output = await compiler.compile(code, name);
      this.setState({ output, compiling: false });
    }
  }
  toggleAuto = () => {
    this.setState({ auto: !this.state.auto })
  }
  componentDidUpdate(prevProps) {
    const { codeFile, stage } = this.props;
    const fileChanged = (codeFile.id !== prevProps.codeFile.id);
    if(this.state.auto && !fileChanged) {
      let codeChanged = (codeFile.initialCode !== prevProps.codeFile.initialCode);
      if(codeFile.hasProgress) {
        const solution = stage.solutions.find(x => x.codeFileId === codeFile.id);
        const prevSolution = prevProps.stage.solutions.find(x => x.codeFileId === codeFile.id);
        codeChanged = (solution.code !== prevSolution.code);
      }
      if(codeChanged) {
          this.compile();
      }
    }
  }
  render() {
    const { compiling, output, auto } = this.state;
    const { hide } = this.props;
    return (
      <div className="compilation">
        <CompilationToolbar compile={this.compile} hide={hide} compiling={compiling} auto={auto} toggleAuto={this.toggleAuto}/>
        <CompilationDisplay compile={this.compile} output={output} toggleAuto={this.toggleAuto}/>
      </div>
    )
  }
}

export default Compilation;
