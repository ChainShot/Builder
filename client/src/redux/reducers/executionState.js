import {
  START_CODE_EXECUTION,
  COMPLETE_CODE_EXECUTION
} from '../actionTypes';

const initialStageState = {
  running: false,
  output: null,
  runIdx: 0,
}

const initialState = {
  stages: {},
  default: initialStageState,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case START_CODE_EXECUTION: {
      const { stageId } = action.payload;
      const existingValues = state.stages[stageId] || state.default;
      return {
        ...state,
        stages: {
          ...state.stages,
          [stageId]: {
            ...existingValues,
            running: true,
          }
        }
      }
    }
    case COMPLETE_CODE_EXECUTION: {
      const { output, stageId } = action.payload;
      return {
        ...state,
        stages: {
          ...state.stages,
          [stageId]: {
            ...state.stages[stageId],
            running: false,
            runIdx: state.stages[stageId].runIdx + 1,
            output,
          }
        }
      }
    }
    default:
      return state
  }
}
