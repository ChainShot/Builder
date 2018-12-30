import React, { Component } from 'react';
import './CompileCodeToolbar.scss';
import SVG from '../../SVG';
import { startCompilation } from '../../../redux/actions';
import { connect } from 'react-redux';

class CompileCodeToolbar extends Component {
  render() {
    const { startCompilation, compilationState: { compiling } } = this.props;
    const classes = ['compile-code'];
    if(compiling) classes.push('running');
    return (
      <li className={classes.join(' ')} onClick={startCompilation}>
        <SVG name="code" />
        <div>Compile Code</div>
      </li>
    )
  }
}

const mapStateToProps = ({ compilationState }) => ({ compilationState });
const mapDispatchToProps = { startCompilation }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompileCodeToolbar);
