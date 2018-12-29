import {
  START_SAVE,
  COMPLETE_SAVE,
  REGISTER_CHANGES,
  UNREGISTER_CHANGES,
  TOGGLE_AUTOSAVE,
  START_CODE_EXECUTION,
  COMPLETE_CODE_EXECUTION,
} from "./actionTypes";

export const startSave = () => ({ type: START_SAVE });
export const completeSave = () => ({ type: COMPLETE_SAVE });
export const registerChanges = () => ({ type: REGISTER_CHANGES });
export const unregisterChanges = () => ({ type: UNREGISTER_CHANGES });
export const toggleAutosave = () => ({ type: TOGGLE_AUTOSAVE });

export const startCodeExecution = () => ({ type: START_CODE_EXECUTION });
export const completeCodeExecution = (output) => {
    return ({ type: COMPLETE_CODE_EXECUTION, payload: { output } });
}
