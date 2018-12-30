import React, { Component } from 'react';
import './RunCode.scss';
import SVG from '../../SVG';
import { startCodeExecution } from '../../../redux/actions';
import { connect } from 'react-redux';

class RunCode extends Component {
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
      <div className={classes.join(' ')} onClick={startCodeExecution}>
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
