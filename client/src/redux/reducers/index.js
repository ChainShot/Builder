import { combineReducers } from "redux";
import saveState from "./saveState";
import executionState from "./executionState";
import compilationState from "./compilationState";
import codeFilePaneState from './codeFilePaneState';
import sidebarState from './sidebarState';

export default combineReducers({
  saveState,
  executionState,
  compilationState,
  codeFilePaneState,
  sidebarState,
});
