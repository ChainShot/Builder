import {
  START_COMPILATION,
  COMPLETE_COMPILATION
} from '../actionTypes';

const initialState = {
  compiling: false,
  output: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case START_COMPILATION:
      return {
        ...state,
        compiling: true,
      }
    case COMPLETE_COMPILATION:
      const { output } = action.payload;
      return {
        ...state,
        compiling: false,
        output,
      }
    default:
      return state
  }
}
