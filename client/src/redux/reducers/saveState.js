import {
  START_SAVE,
  COMPLETE_SAVE,
  REGISTER_VALID_SAVE_STATE,
  REGISTER_INVALID_SAVE_STATE,
  REGISTER_CHANGES,
  UNREGISTER_CHANGES,
  TOGGLE_AUTOSAVE
} from '../actionTypes';

const initialState = {
  saving: false,
  changes: false,
  errors: null,
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
    case REGISTER_VALID_SAVE_STATE:
      return {
        ...state,
        errors: null,
      }
    case REGISTER_INVALID_SAVE_STATE:
      const { errors } = action.payload;
      return {
        ...state,
        errors,
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
    default:
      return state
  }
}
