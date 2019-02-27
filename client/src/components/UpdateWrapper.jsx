import React, { Component } from 'react';
import {
  completeSave,
  registerChanges,
  unregisterChanges,
  registerValidState,
  registerInvalidState } from '../redux/actions';
import { connect } from 'react-redux';

function deepMerge(props, dest) {
  const merged = Array.isArray(props) ? [ ...dest ] : { ...dest };
  const keys = Object.keys(props);
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if(props[key] && typeof props[key] === 'object') {
      merged[key] = deepMerge(props[key], dest[key]);
    }
    else {
      merged[key] = props[key];
    }
  }
  return merged;
}

function deeplyEqualObjects(a, b) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if(aKeys.length !== bKeys.length) return false;
  for(let i = 0; i < aKeys.length; i++) {
    const key = aKeys[i];
    if(a[key] && typeof a[key] === 'object') {
      if(!deeplyEqualObjects(a[key], b[key])) {
        return false;
      }
    }
    else if(a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}

class UpdateWrapper extends Component {
  setInitialState() {
    const { child, savePromise, validateFn, ...rest } = this.props;
    this.state = {
      savePromise,
      validateFn,
      originalState: { ...rest },
      currentState: { ...rest },
    }
  }

  constructor(props) {
    super(props);
    this.setInitialState();
  }

  onSave(savePromise) {
    this.setState({ savePromise });
  }

  onValidate(validateFn) {
    this.setState({ validateFn });
  }

  componentWillUnmount() {
    const { saveState: { changes }} = this.props;
    if(changes) {
      this.saveState();
    }
    this.props.registerValidState();
  }

  async saveState() {
    const { saveState: { errors }} = this.props;
    if(!errors) {
      try {
        this.setState({ originalState: this.state.currentState });
        this.props.unregisterChanges();
        await this.state.savePromise(this.state.currentState);
      }
      catch(ex) {
        // do nothing: mutations automatically display errors
        // allow the user to attempt to fix their current state and retry
      }
    }
    const changes = !deeplyEqualObjects(this.state.originalState, this.state.currentState);
    this.props.completeSave(changes);
  }

  async componentDidUpdate(prevProps) {
    const { saveState: { saving }} = this.props;
    if(saving && !prevProps.saveState.saving) {
      this.saveState();
    }
    if(this.props.key !== prevProps.key) {
      this.saveState();
      this.setInitialState();
    }
  }

  update(state) {
    const newState = deepMerge(state, this.state.currentState);

    this.setState({ currentState: newState });

    const { saveState: { valid }} = this.props;
    if(this.state.validateFn) {
      const errors = this.state.validateFn(newState) || [];
      if(errors.length > 0) {
        this.props.registerInvalidState(errors);
      }
      else if(!valid) {
        this.props.registerValidState();
      }
    }

    if(!deeplyEqualObjects(this.state.originalState, newState)) {
      this.props.registerChanges();
    }
    else {
      this.props.unregisterChanges();
    }
  }

  render() {
    const { child, saveState } = this.props;
    const { changes, errors } = saveState;
    const { currentState } = this.state;
    const ChildComponent = child;
    return (
        <React.Fragment>
          <ChildComponent {...currentState}
                    saveState={saveState}
                    onValidate={(...args) => this.onValidate(...args)}
                    onSave={(...args) => this.onSave(...args)}
                    update={(...args) => this.update(...args)} />
        </React.Fragment>
    )
  }
}

const mapStateToProps = ({ saveState }) => ({ saveState });
const mapDispatchToProps = {
  completeSave,
  registerValidState,
  registerInvalidState,
  registerChanges,
  unregisterChanges,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateWrapper);
