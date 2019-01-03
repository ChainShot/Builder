import React, { Component } from 'react';
import { completeSave, registerChanges, unregisterChanges } from '../redux/actions';
import { connect } from 'react-redux';

function deepMerge(props, dest) {
  const merged = { ...dest };
  const keys = Object.keys(props);
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if(typeof props[key] === 'object') {
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
  constructor(props) {
    super(props);
    const { child, savePromise, ...rest } = props;
    this.state = {
      savePromise,
      originalState: { ...rest },
      currentState: { ...rest },
    }
  }

  onSave(savePromise) {
    this.setState({ savePromise });
  }

  async componentDidUpdate(prevProps) {
    const { saveState: { saving }} = this.props;
    if(saving && !prevProps.saveState.saving) {
      try {
        this.setState({ originalState: this.state.currentState });
        this.props.unregisterChanges();
        await this.state.savePromise(this.state.currentState);
      }
      catch(ex) {
        // TODO: revert original state and show a message to user
      }
      const changes = !deeplyEqualObjects(this.state.originalState, this.state.currentState);
      this.props.completeSave(changes);
    }
  }

  update(state) {
    const newState = deepMerge(state, this.state.currentState);

    this.setState({ currentState: newState })

    if(!deeplyEqualObjects(this.state.originalState, newState)) {
      this.props.registerChanges();
    }
    else {
      this.props.unregisterChanges();
    }
  }

  render() {
    const { child } = this.props;
    const { currentState } = this.state;
    const ChildComponent = child;
    return <ChildComponent {...currentState}
              onSave={(...args) => this.onSave(...args)}
              update={(...args) => this.update(...args)} />
  }
}

const mapStateToProps = ({ saveState }) => ({ saveState });
const mapDispatchToProps = { completeSave, registerChanges, unregisterChanges }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateWrapper);
