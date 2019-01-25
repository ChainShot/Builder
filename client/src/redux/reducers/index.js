import { combineReducers } from "redux";
import saveState from "./saveState";
import executionState from "./executionState";
import compilationState from "./compilationState";
import codeFilePaneState from './codeFilePaneState';

export default combineReducers({
  saveState,
  executionState,
  compilationState,
  codeFilePaneState
});
