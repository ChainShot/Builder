import { combineReducers } from "redux";
import saveState from "./saveState";
import executionState from "./executionState";
import compilationState from "./compilationState";

export default combineReducers({ saveState, executionState, compilationState });
