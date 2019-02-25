import React, {Component} from 'react';
import './Compilation.scss';
import * as compilers from '../../../../utils/api/compilers';
import debounce from '../../../../utils/debounce';
import CompilationDisplay from './CompilationDisplay';
import CompilationToolbar from './CompilationToolbar';
import { completeCompilation, startCompilation } from '../../../../redux/actions';
import { connect } from 'react-redux';

class Compilation extends Component {
  state = {
    auto: true,
  }
  compile = async () => {
    const { stage, code, codeFile } = this.props;
    const { language, languageVersion, codeFiles, solutions } = stage;

    if(language === 'solidity') {
      const sources = codeFiles
        .reduce((obj, { id, name, executable, initialCode, hasProgress, executablePath }) => {
          if(executable && executablePath.indexOf('contracts/') >= 0) {
            if(id === codeFile.id) {
              obj[executablePath] = code;
            }
            else if (hasProgress) {
              const solution = solutions.find(x => x.codeFileId === id);
              obj[executablePath] = solution.code;
            }
            else {
              obj[executablePath] = initialCode;
            }
          }
          return obj;
        }, {});
      const output = await compilers.solc.compile(sources, languageVersion);
      this.props.completeCompilation(output);
    }

    if(language === 'vyper') {
      const output = await compilers.vyper.compile(code);
      this.props.completeCompilation(output);
    }
  }
  startCompilation = () => {
    this.props.startCompilation();
  }
  toggleAuto = () => {
    this.setState({ auto: !this.state.auto })
  }
  debouncedCompile = debounce(this.compile, 500)
  componentDidUpdate(prevProps) {
    const { code } = this.props;
    if(this.state.auto && code !== prevProps.code) {
      this.debouncedCompile();
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
