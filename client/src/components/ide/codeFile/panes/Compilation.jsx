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
    const { stage, codeFile, code } = this.props;
    const { language } = stage;

    let compiler;
    if(language === 'solidity') compiler = compilers.solc;
    else if(language === 'vyper') compiler = compilers.vyper;

    if(compiler) {
      const { name } = codeFile;
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
    const { code } = this.props;
    if(this.state.auto && code !== prevProps.code) {
      this.compile();
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
