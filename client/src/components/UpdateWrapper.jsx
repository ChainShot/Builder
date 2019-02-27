import React, { Component } from 'react';
import debounce from 'utils/debounce';
import deeplyEqualObjects from 'utils/deeplyEqualObjects';
import deepMerge from 'utils/deepMerge';

const DEBOUNCE_INTERVAL = 1000;

class UpdateWrapper extends Component {
  setInitialState() {
    const { child, savePromise, validateFn, ...rest } = this.props;
    this.state = {
      savePromise,
      validateFn,
      errors: [],
      hasChanges: false,
      originalState: { ...rest },
      currentState: { ...rest },
    }
  }

  constructor(props) {
    super(props);
    this.debouncedSave = debounce((key) => {
      if(!key) throw new Error("Must provide key on debounce");
      this.saveState(key);
    }, DEBOUNCE_INTERVAL);
    this.setInitialState();
  }

  onSave(savePromise) {
    this.setState({ savePromise });
  }

  onValidate(validateFn) {
    this.setState({ validateFn });
  }

  componentWillUnmount() {
    const { hasChanges } = this.state;
    if(hasChanges) {
      this.saveState();
    }
  }

  async saveState(debounceKey) {
    if(debounceKey && debounceKey !== this.props.debounceKey) {
      // for debounced saves check to make sure the key hasnt changed
      // if it has don't save
      return;
    }

    const { errors } = this.state;
    if(errors.length === 0) {
      try {
        this.setState({
          originalState: this.state.currentState,
          hasChanges: false,
        });
        await this.state.savePromise(this.state.currentState);
      }
      catch(ex) {
        // do nothing: mutations automatically display errors
        // allow the user to attempt to fix their current state and retry
      }
    }
    const hasChanges = !deeplyEqualObjects(this.state.originalState, this.state.currentState);
    this.setState({ hasChanges })
  }

  update(state) {
    const newState = deepMerge(state, this.state.currentState);

    this.setState({ currentState: newState });

    if(this.state.validateFn) {
      const errors = this.state.validateFn(newState) || [];
      this.setState({ errors });
    }

    if(!deeplyEqualObjects(this.state.originalState, newState)) {
      this.debouncedSave(this.props.debounceKey);
    }
  }

  render() {
    const { child } = this.props;
    const { currentState, errors } = this.state;
    const ChildComponent = child;
    return (
        <React.Fragment>
          <ChildComponent {...currentState}
                    errors={errors}
                    onValidate={(...args) => this.onValidate(...args)}
                    onSave={(...args) => this.onSave(...args)}
                    update={(...args) => this.update(...args)} />
        </React.Fragment>
    )
  }
}

export default UpdateWrapper;
