import {
  RESET_IDE,
  START_COMPILATION,
  COMPLETE_COMPILATION
} from '../actionTypes';

const initialStageState = {
  compiling: false,
  output: null,
}

const initialState = {
  stages: {},
  default: initialStageState,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_IDE: {
      return initialState;
    }
    case START_COMPILATION: {
      const { stageId } = action.payload;
      const existingValues = state.stages[stageId] || state.default;
      return {
        ...state,
        stages: {
          ...state.stages,
          [stageId]: {
            ...existingValues,
            compiling: true,
          }
        }
      }
    }
    case COMPLETE_COMPILATION: {
      const { output, stageId } = action.payload;
      return {
        ...state,
        stages: {
          ...state.stages,
          [stageId]: {
            ...state.stages[stageId],
            compiling: false,
            output,
          }
        }
      }
    }
    default:
      return state
  }
}
