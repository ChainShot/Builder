import { combineReducers } from "redux";
import saveState from "./saveState";
import executionState from "./executionState";

export default combineReducers({ saveState, executionState });
