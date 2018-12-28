import store from '../store';
import { completeSave, registerChanges, unregisterChanges } from '../actions';

const svcInitialState = {
  savePromise: null,
  isSaving: false,
  originalState: null,
  currentState: null,
}

const svc = {
  __state: { ...svcInitialState },
  getState: function() {
    return this.__state.currentState;
  },
  register: function (_originalState, _savePromise) {
    this.__state.savePromise = _savePromise;
    this.__state.originalState = _originalState;
    this.__state.currentState = _originalState;
  },
  onUpdate: function (state) {
    this.__state.currentState = {
      ...this.__state.currentState,
      ...state,
    };
    if(!equalObjects(this.__state.originalState, this.__state.currentState)) {
      store.dispatch(registerChanges());
    }
    else {
      store.dispatch(unregisterChanges());
    }
  },
  unregister: function () {
    this.__state = { ...svcInitialState }
  }
}

store.subscribe(async () => {
  const { saveState: { saving }} = store.getState();
  if(saving && !svc.__state.isSaving) {
    try {
      svc.__state.originalState = svc.__state.currentState;
      await svc.__state.savePromise(svc.__state.currentState);
      store.dispatch(unregisterChanges());
    }
    catch(ex) {
      // TODO: revert original state and show a message to user
    }
    store.dispatch(completeSave());
  }
  if(!saving && svc.__state.isSaving) {
    svc.__state.isSaving = false;
  }
});

function equalObjects(a, b) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if(aKeys.length !== bKeys.length) return false;
  for(let i = 0; i < aKeys.length; i++) {
    const key = aKeys[i];
    if(a[key] !== b[key]) return false;
  }
  return true;
}

export default svc;
