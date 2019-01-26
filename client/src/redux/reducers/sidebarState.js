import {
  OPEN_SIDEBAR_STAGE,
  CLOSE_SIDEBAR_STAGE,
} from '../actionTypes';

const initialState = {
  stagesOpen: [],
}

export default function(state = initialState, action) {
  const { stageId } = action.payload || {};
  switch (action.type) {
    case OPEN_SIDEBAR_STAGE:
      return {
        ...state,
        stagesOpen: state.stagesOpen.concat(stageId),
      }
    case CLOSE_SIDEBAR_STAGE:
      const idx = state.stagesOpen.indexOf(stageId);
      return {
        ...state,
        stagesOpen: [
          ...state.stagesOpen.slice(0, idx),
          ...state.stagesOpen.slice(idx+1),
        ],
      }
    default:
      return state
  }
}
