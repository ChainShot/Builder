import React, { Component } from 'react';
import debounce from '../../../utils/debounce';
import SVG from '../../SVG';
import './AutoSave.scss';

const DEBOUNCE_INTERVAL = 1000;
class AutoSave extends Component {
  componentDidMount() {
    this.debouncedSave = debounce(this.startSaveDebounced, DEBOUNCE_INTERVAL);
  }
  startSaveDebounced() {
    // since this is debounced, check to make sure we should still save
    const { saveState: { autosave, changes } } = this.props;
    if(autosave && changes) {
      this.props.startSave();
    }
  }
  componentDidUpdate() {
    const { saveState: { autosave, changes, errors } } = this.props;
    if(autosave && changes && !errors) {
      this.debouncedSave();
    }
  }
  render() {
    const { toggleAutosave, saveState: { autosave } } = this.props;
    const classes = ['auto-save'];
    if(autosave) classes.push('on');
    return (
      <div className={classes.join(' ')} onClick={toggleAutosave} data-rh="Autosave (Toggle)">
        <SVG name="magic" />
      </div>
    )
  }
}

export default AutoSave;
