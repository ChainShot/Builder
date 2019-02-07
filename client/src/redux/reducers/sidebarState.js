import {
  OPEN_SIDEBAR_STAGE,
  CLOSE_SIDEBAR_STAGE,
  OPEN_SIDEBAR_CONTAINER,
  CLOSE_SIDEBAR_CONTAINER,
} from '../actionTypes';

const initialState = {
  stagesOpen: [],
  containerOpen: false,
}

export default function(state = initialState, action) {
  const { stageId } = action.payload || {};
  switch (action.type) {
    case OPEN_SIDEBAR_CONTAINER:
      return {
        ...state,
        containerOpen: true,
      }
    case CLOSE_SIDEBAR_CONTAINER:
      return {
        ...state,
        containerOpen: false,
      }
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
