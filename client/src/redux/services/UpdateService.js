import store from '../store';
import { completeSave, registerChanges, unregisterChanges } from '../actions';

let savePromise = null;
let isSaving = false;
let originalState = null;
let currentState = null;

store.subscribe(async () => {
  const { saveState: { saving }} = store.getState();
  if(saving && !isSaving) {
    try {
      originalState = currentState;
      await savePromise(currentState);
      store.dispatch(unregisterChanges());
    }
    catch(ex) {

    }
    store.dispatch(completeSave());
  }
  if(!saving && isSaving) {
    isSaving = false;
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

export default {
  register: (_originalState, _savePromise) => {
    savePromise = _savePromise;
    originalState = _originalState;
  },
  onUpdate: (state) => {
    currentState = state;
    if(!equalObjects(originalState, state)) {
      store.dispatch(registerChanges());
    }
    else {
      store.dispatch(unregisterChanges());
    }
  },
  unregister: () => {
    savePromise = null;
    isSaving = false;
    originalState = null;
    currentState = null;
  }
}
