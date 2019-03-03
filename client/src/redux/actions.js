import {
  SET_STAGE_CONTAINER,
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
  CLOSE_TABS,
  CLOSE_OTHER_TABS,
  CLOSE_TABS_TO_THE_RIGHT,
  OPEN_FOLDER,
  CLOSE_FOLDER,
  CLOSE_SIDEBAR_STAGE,
  OPEN_SIDEBAR_STAGE,
  CLOSE_SIDEBAR_CONTAINER,
  OPEN_SIDEBAR_CONTAINER,
} from "./actionTypes";

export const setStageContainer = (stageContainer) => ({
  type: SET_STAGE_CONTAINER,
  payload: { stageContainer }
});

export const startCodeExecution = (stageId) => ({
  type: START_CODE_EXECUTION,
  payload: { stageId }
});
export const completeCodeExecution = (output, stageId) => ({
  type: COMPLETE_CODE_EXECUTION,
  payload: { output, stageId }
});

export const startCompilation = (stageId) => ({
  type: START_COMPILATION,
  payload: { stageId }
});
export const completeCompilation = (output, stageId) => ({
  type: COMPLETE_COMPILATION,
  payload: { output, stageId }
});

export const setCodeFilePane = (pane, stageId) => ({
  type: SET_CODE_FILE_PANE,
  payload: { pane, stageId }
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

export const openTab = (stageId, type = null, id = null) => ({
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
export const closeTabs = ({stageId, type, id}) => ({
  type: CLOSE_TABS,
  payload: { stageId, type, id }
});
export const closeOtherTabs = ({stageId, type, id}) => ({
  type: CLOSE_OTHER_TABS,
  payload: { stageId, type, id }
});
export const closeTabsToTheRight = ({stageId, type, id}) => ({
  type: CLOSE_TABS_TO_THE_RIGHT,
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
