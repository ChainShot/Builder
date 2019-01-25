import {
  START_CODE_EXECUTION,
  COMPLETE_CODE_EXECUTION
} from '../actionTypes';

const initialState = {
  running: false,
  output: null,
  runIdx: 0,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case START_CODE_EXECUTION:
      return {
        ...state,
        running: true,
      }
    case COMPLETE_CODE_EXECUTION:
      const { output } = action.payload;
      return {
        ...state,
        running: false,
        runIdx: state.runIdx + 1,
        output,
      }
    default:
      return state
  }
}
