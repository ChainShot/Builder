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
  SET_CODE_FILE_PANE,
  OPEN_CODE_FILE,
  CLOSE_CODE_FILE,
  SET_ACTIVE_TAB,
  OPEN_TAB,
  CLOSE_TAB,
  OPEN_FOLDER,
  CLOSE_FOLDER,
  CLOSE_SIDEBAR_STAGE,
  OPEN_SIDEBAR_STAGE,
  CLOSE_SIDEBAR_CONTAINER,
  OPEN_SIDEBAR_CONTAINER,
} from "./actionTypes";

export const startSave = () => ({ type: START_SAVE });
export const completeSave = (changes) => ({
  type: COMPLETE_SAVE,
  payload: { changes }
});
export const registerValidState = () => ({ type: REGISTER_VALID_SAVE_STATE });
export const registerInvalidState = (errors) => ({
  type: REGISTER_INVALID_SAVE_STATE,
  payload: { errors }
});
export const registerChanges = () => ({ type: REGISTER_CHANGES });
export const unregisterChanges = () => ({ type: UNREGISTER_CHANGES });

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

export const setCodeFilePane = (pane, stage) => ({
  type: SET_CODE_FILE_PANE,
  payload: { pane, stage }
});

export const openSidebarStage = (stageId) => ({
  type: OPEN_SIDEBAR_STAGE,
  payload: { stageId }
});
export const closeSidebarStage = (stageId) => ({
  type: CLOSE_SIDEBAR_STAGE,
  payload: { stageId }
});

export const openCodeFile = (stageId, id) => ({
  type: OPEN_CODE_FILE,
  payload: { stageId, id }
});
export const closeCodeFile = (stageId, id) => ({
  type: CLOSE_CODE_FILE,
  payload: { stageId, id }
});

export const openTab = (stageId, type, id) => ({
  type: OPEN_TAB,
  payload: { stageId, type, id }
});
export const setActiveTab = (idx) => ({
  type: SET_ACTIVE_TAB,
  payload: { idx }
});
export const closeTab = ({stageId, type, id}) => ({
  type: CLOSE_TAB,
  payload: { stageId, type, id }
});

export const openFolder = (stageId, folderPath) => ({
  type: OPEN_FOLDER,
  payload: { stageId, folderPath }
});
export const closeFolder = (stageId, folderPath) => ({
  type: CLOSE_FOLDER,
  payload: { stageId, folderPath }
});

export const openSidebarContainer = () => ({ type: OPEN_SIDEBAR_CONTAINER });
export const closeSidebarContainer = () => ({ type: CLOSE_SIDEBAR_CONTAINER });
