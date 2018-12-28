import React, { Component } from 'react';
import './SaveToolbar.scss';
import Save from './Save';
import AutoSave from './AutoSave';
import { startSave, toggleAutosave } from '../../../redux/actions';
import { connect } from 'react-redux';

class SaveToolbar extends Component {
  render() {
    const { startSave, toggleAutosave, saveState } = this.props;
    return (
      <React.Fragment>
        <AutoSave toggleAutosave={toggleAutosave} startSave={startSave} saveState={saveState}/>
        <Save startSave={startSave} saveState={saveState}/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ saveState }) => ({ saveState });
const mapDispatchToProps = { startSave, toggleAutosave }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaveToolbar);
