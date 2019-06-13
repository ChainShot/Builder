import {
  RESET_IDE,
  SET_CODE_FILE_PANE,
} from '../actionTypes';

const initialState = {
  stages: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_IDE: {
      return initialState;
    }
    case SET_CODE_FILE_PANE:
      const { pane, stageId } = action.payload;
      return {
        stages: {
          ...state.stages,
          [stageId]: pane,
        }
      }
    default:
      return state
  }
}
