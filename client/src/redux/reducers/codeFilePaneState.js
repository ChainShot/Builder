import {
  SET_CODE_FILE_PANE,
} from '../actionTypes';

const initialState = {
  pane: null,
  stage: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CODE_FILE_PANE:
      const { pane, stage } = action.payload;
      return {
        pane,
        stage,
      }
    default:
      return state
  }
}
