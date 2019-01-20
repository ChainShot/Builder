import {
  START_SAVE,
  COMPLETE_SAVE,
  REGISTER_VALID_SAVE_STATE,
  REGISTER_INVALID_SAVE_STATE,
  REGISTER_CHANGES,
  UNREGISTER_CHANGES,
  TOGGLE_AUTOSAVE,
  START_CODE_EXECUTION,
  COMPLETE_CODE_EXECUTION,
  START_COMPILATION,
  COMPLETE_COMPILATION,
} from "./actionTypes";

export const startSave = () => ({ type: START_SAVE });
export const completeSave = (changes) => ({
  type: COMPLETE_SAVE,
  payload: { changes }
});
export const registerValidState = () => ({ type: REGISTER_VALID_SAVE_STATE });
export const registerInvalidState = (errors) => ({
  type: REGISTER_INVALID_SAVE_STATE ,
  payload: { errors }
});
export const registerChanges = () => ({ type: REGISTER_CHANGES });
export const unregisterChanges = () => ({ type: UNREGISTER_CHANGES });
export const toggleAutosave = () => ({ type: TOGGLE_AUTOSAVE });

export const startCodeExecution = () => ({ type: START_CODE_EXECUTION });
export const completeCodeExecution = (output) => ({
  type: COMPLETE_CODE_EXECUTION,
  payload: { output }
});

export const startCompilation = () => ({ type: START_COMPILATION });
export const completeCompilation = (output) => ({
  type: COMPLETE_COMPILATION,
  payload: { output }
});
