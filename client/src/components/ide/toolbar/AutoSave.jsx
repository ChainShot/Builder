import React, { Component } from 'react';
import debounce from '../../../utils/debounce';
import SVG from '../../SVG';

const DEBOUNCE_INTERVAL = 1000;
class AutoSave extends Component {
  componentDidMount() {
    this.debouncedSave = debounce(this.props.startSave, DEBOUNCE_INTERVAL);
  }
  componentDidUpdate() {
    const { saveState: { autosave, changes } } = this.props;
    if(autosave && changes) {
      this.debouncedSave();
    }
  }
  render() {
    const { toggleAutosave, saveState: { autosave } } = this.props;
    const classes = ['auto-save'];
    if(autosave) classes.push('on');
    return (
      <li className={classes.join(' ')} onClick={toggleAutosave}>
        <SVG name="magic" />
        Auto-Save
      </li>
    )
  }
}

export default AutoSave;
