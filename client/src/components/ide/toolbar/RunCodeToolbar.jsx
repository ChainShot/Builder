import React, { Component } from 'react';
import './RunCodeToolbar.scss';
import SVG from '../../SVG';
import { startCodeExecution } from '../../../redux/actions';
import { connect } from 'react-redux';

class RunCodeToolbar extends Component {
  componentDidMount() {
    document.addEventListener('keydown', (evt) => {
      if(evt.metaKey && (evt.keyCode === 13)) {
        this.props.startCodeExecution();
        evt.preventDefault();
      }
    })
  }
  render() {
    const { startCodeExecution, executionState: { running } } = this.props;
    const classes = ['run-code'];
    if(running) classes.push('running');
    return (
      <li className={classes.join(' ')} onClick={startCodeExecution}>
        <SVG name="play" />
        <div>Run Code</div>
      </li>
    )
  }
}

const mapStateToProps = ({ executionState }) => ({ executionState });
const mapDispatchToProps = { startCodeExecution }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RunCodeToolbar);
