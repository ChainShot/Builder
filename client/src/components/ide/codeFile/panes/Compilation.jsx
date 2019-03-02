import React, {Component} from 'react';
import './Compilation.scss';
import * as compilers from '../../../../utils/api/compilers';
import debounce from '../../../../utils/debounce';
import CompilationDisplay from './CompilationDisplay';
import CompilationToolbar from './CompilationToolbar';
import { completeCompilation, startCompilation, setCodeFilePane } from '../../../../redux/actions';
import { connect } from 'react-redux';
import { CODE_FILE_PANES } from 'config';

class Compilation extends Component {
  state = {
    auto: true,
  }
  shortcut = (evt) => {
    if((evt.ctrlKey || evt.metaKey) && (evt.keyCode === 222) && !(evt.shiftKey || evt.altKey)) {
      this.compile();
      evt.preventDefault();
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.shortcut)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.shortcut)
  }
  compile = async () => {
    const { stage, code, codeFile } = this.props;
    const { language, languageVersion, codeFiles, solutions } = stage;
    this.props.startCompilation(stage.id);
    this.props.setCodeFilePane(CODE_FILE_PANES.COMPILATION_TAB, stage.id);

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
      this.props.completeCompilation(output, stage.id);
    }

    if(language === 'vyper') {
      const output = await compilers.vyper.compile(code);
      this.props.completeCompilation(output, stage.id);
    }
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
  }
  getCompilationState() {
    const { stage } = this.props;
    return this.props.compilationState.stages[stage.id] || this.props.compilationState.default;
  }
  render() {
    const { auto } = this.state;
    const { hide, shouldShow } = this.props;
    const { output, compiling } = this.getCompilationState();
    if(!shouldShow) return null;
    return (
      <div className="compilation">
        <CompilationToolbar compile={this.compile} hide={hide} compiling={compiling} auto={auto} toggleAuto={this.toggleAuto}/>
        <CompilationDisplay compile={this.compile} output={output} toggleAuto={this.toggleAuto}/>
      </div>
    )
  }
}

const mapStateToProps = ({ compilationState }) => ({ compilationState });
const mapDispatchToProps = { completeCompilation, startCompilation, setCodeFilePane }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Compilation);
