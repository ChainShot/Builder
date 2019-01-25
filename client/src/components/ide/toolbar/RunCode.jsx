import React, { Component } from 'react';
import './RunCode.scss';
import SVG from '../../SVG';
import { startCodeExecution, completeCodeExecution } from '../../../redux/actions';
import isMacLike from '../../../utils/isMacLike';
import { connect } from 'react-redux';

class RunCode extends Component {
  shortcut = (evt) => {
    if((evt.ctrlKey || evt.metaKey) && (evt.keyCode === 13) && !(evt.shiftKey || evt.altKey)) {
      this.props.startCodeExecution();
      evt.preventDefault();
    }
    if((evt.ctrlKey || evt.metaKey) && (evt.keyCode === 27) && !(evt.shiftKey || evt.altKey)) {
      this.props.completeCodeExecution();
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
    const { startCodeExecution, executionState: { running } } = this.props;
    const classes = ['run-code'];
    const shortcut = isMacLike() ? 'CMD + ENTER' : 'CTRL + ENTER';
    if(running) classes.push('running');
    return (
      <div className={classes.join(' ')} onClick={startCodeExecution} data-rh={`Run Code (${shortcut})`}>
        <SVG name="play" />
      </div>
    )
  }
}

const mapStateToProps = ({ executionState }) => ({ executionState });
const mapDispatchToProps = { startCodeExecution, completeCodeExecution }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RunCode);
