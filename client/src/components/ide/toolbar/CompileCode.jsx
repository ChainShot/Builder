import React, { Component } from 'react';
import './CompileCode.scss';
import SVG from '../../SVG';
import { startCompilation } from '../../../redux/actions';
import { connect } from 'react-redux';

const COMPILE_REGEX = /\w*(\.sol|\.v\.py)$/;

class CompileCode extends Component {
  render() {
    const { codeFile, startCompilation, compilationState: { compiling } } = this.props;
    if(!COMPILE_REGEX.test(codeFile.name)) return null;
    const classes = ['compile-code'];
    if(compiling) classes.push('running');
    return (
      <div className={classes.join(' ')} onClick={startCompilation}>
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
