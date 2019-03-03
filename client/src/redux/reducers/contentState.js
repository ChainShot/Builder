import {
  SET_STAGE_CONTAINER,
} from '../actionTypes';

const initialState = {
  stageContainer: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_STAGE_CONTAINER:
      const { stageContainer } = action.payload;
      return { stageContainer }
    default:
      return state
  }
}
