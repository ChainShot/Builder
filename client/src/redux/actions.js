import { START_SAVE, COMPLETE_SAVE, REGISTER_CHANGES, UNREGISTER_CHANGES, TOGGLE_AUTOSAVE } from "./actionTypes";

export const startSave = () => ({ type: START_SAVE });
export const completeSave = () => ({ type: COMPLETE_SAVE });
export const registerChanges = () => ({ type: REGISTER_CHANGES });
export const unregisterChanges = () => ({ type: UNREGISTER_CHANGES });
export const toggleAutosave = () => ({ type: TOGGLE_AUTOSAVE });
