import React, {Component} from 'react';
import './Compilation.scss';
import * as compilers from '../../../../utils/api/compilers';
import CompilationDisplay from './CompilationDisplay';
import CompilationToolbar from './CompilationToolbar';
import { completeCompilation, startCompilation } from '../../../../redux/actions';
import { connect } from 'react-redux';

class Compilation extends Component {
  state = {
    auto: true,
  }
  compile = async () => {
    const { stage, codeFile } = this.props;
    const { language } = stage;

    let compiler;
    if(language === 'solidity') compiler = compilers.solc;
    else if(language === 'vyper') compiler = compilers.vyper;

    if(compiler) {
      const { initialCode, name, hasProgress } = codeFile;
      let code = initialCode;
      if(hasProgress) {
        const solution = stage.solutions.find(x => x.codeFileId === codeFile.id);
        code = solution.code;
      }
      const output = await compiler.compile(code, name);
      this.props.completeCompilation(output);
    }
  }
  startCompilation = () => {
    this.props.startCompilation();
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
    const { compilationState: { compiling }} = this.props;
    if(!prevProps.compilationState.compiling && compiling) {
      this.compile();
    }
  }
  render() {
    const { auto } = this.state;
    const { hide, shouldShow, compilationState: { output, compiling } } = this.props;
    if(!shouldShow) return null;
    return (
      <div className="compilation">
        <CompilationToolbar compile={this.startCompilation} hide={hide} compiling={compiling} auto={auto} toggleAuto={this.toggleAuto}/>
        <CompilationDisplay compile={this.startCompilation} output={output} toggleAuto={this.toggleAuto}/>
      </div>
    )
  }
}

const mapStateToProps = ({ compilationState }) => ({ compilationState });
const mapDispatchToProps = { completeCompilation, startCompilation }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Compilation);
