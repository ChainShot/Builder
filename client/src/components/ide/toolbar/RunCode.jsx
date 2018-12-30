import React, { Component } from 'react';
import './RunCode.scss';
import SVG from '../../SVG';
import { startCodeExecution } from '../../../redux/actions';
import isMacLike from '../../../utils/isMacLike';
import { connect } from 'react-redux';

class RunCode extends Component {
  shortcut = (evt) => {
    if(evt.metaKey && (evt.keyCode === 13)) {
      this.props.startCodeExecution();
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
    const shortcut = isMacLike ? 'CMD + ENTER' : 'CTRL + ENTER';
    if(running) classes.push('running');
    return (
      <div className={classes.join(' ')} onClick={startCodeExecution} data-rh={`Run Code (${shortcut})`}>
        <SVG name="play" />
      </div>
    )
  }
}

const mapStateToProps = ({ executionState }) => ({ executionState });
const mapDispatchToProps = { startCodeExecution }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RunCode);
