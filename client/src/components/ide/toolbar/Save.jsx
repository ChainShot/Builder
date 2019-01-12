import React, { Component } from 'react';
import SVG from '../../SVG';
import isMacLike from '../../../utils/isMacLike';
import './Save.scss';

class Save extends Component {
  shortcut = (evt) => {
    if((evt.ctrlKey || evt.metaKey) && (evt.keyCode === 83)) {
      this.props.startSave();
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
    const { startSave, saveState: { saving, changes } } = this.props;
    const classes = ['save'];
    const shortcut = isMacLike() ? 'CMD + S' : 'CTRL + S';
    if(saving) classes.push('saving');
    if(changes) classes.push('has-changes');
    return (
      <div className={classes.join(' ')} onClick={startSave} data-rh={`Save Changes (${shortcut})` }>
        <SVG name="save" />
      </div>
    )
  }
}

export default Save;
