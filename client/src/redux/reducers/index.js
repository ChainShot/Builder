import { combineReducers } from "redux";
import executionState from "./executionState";
import compilationState from "./compilationState";
import codeFilePaneState from './codeFilePaneState';
import sidebarState from './sidebarState';
import ideState from './ideState';

export default combineReducers({
  executionState,
  compilationState,
  codeFilePaneState,
  sidebarState,
  ideState,
});
