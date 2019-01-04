import {
  START_SAVE,
  COMPLETE_SAVE,
  REGISTER_CHANGES,
  UNREGISTER_CHANGES,
  TOGGLE_AUTOSAVE
} from '../actionTypes';

const initialState = {
  saving: false,
  changes: false,
  autosave: true,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case START_SAVE:
      return {
        ...state,
        saving: true,
      }
    case COMPLETE_SAVE:
      const { changes } = action.payload;
      return {
        ...state,
        changes,
        saving: false,
      }
    case UNREGISTER_CHANGES:
      return {
        ...state,
        changes: false,
      }
    case REGISTER_CHANGES:
      return {
        ...state,
        changes: true,
      }
    case TOGGLE_AUTOSAVE:
      return {
        ...state,
        autosave: !state.autosave
      }
    default:
      return state
  }
}
