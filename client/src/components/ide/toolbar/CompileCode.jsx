import React, { Component } from 'react';
import './CompileCode.scss';
import SVG from '../../SVG';
import { startCompilation } from '../../../redux/actions';
import isMacLike from '../../../utils/isMacLike';
import { connect } from 'react-redux';

const COMPILE_REGEX = /\w*(\.sol|\.v\.py)$/;

class CompileCode extends Component {
  shortcut = (evt) => {
    if(evt.metaKey && (evt.keyCode === 222)) {
      this.props.startCompilation();
      evt.preventDefault();
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.shortcut)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.shortcut)
  }
  render() {
    const { codeFile, startCompilation, compilationState: { compiling } } = this.props;
    if(!COMPILE_REGEX.test(codeFile.name)) return null;
    const shortcut = isMacLike() ? 'CMD + \'' : 'CTRL + \'';
    const classes = ['compile-code'];
    if(compiling) classes.push('running');
    return (
      <div className={classes.join(' ')} onClick={startCompilation} data-rh={`Compile Code (${shortcut})`}>
        <SVG name="code" />
      </div>
    )
  }
}

const mapStateToProps = ({ compilationState }) => ({ compilationState });
const mapDispatchToProps = { startCompilation }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompileCode);
