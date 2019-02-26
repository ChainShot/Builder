import {
  OPEN_TAB,
  CLOSE_TAB,
} from '../actionTypes';

const initialState = {
  tabsOpen: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_TAB: {
      const { type, id, stageId } = action.payload;
      return {
        ...state,
        tabsOpen: state.tabsOpen.concat({ type, id, stageId })
      }
    }
    case CLOSE_TAB: {
      const { type, id, stageId } = action.payload;
      const idx = state.foldersOpen.findIndex(x => x.type === type && x.id === id && x.stageId === stageId);
      return {
        ...state,
        tabsOpen: [
          ...state.tabsOpen.slice(0, idx),
          ...state.tabsOpen.slice(idx+1),
        ]
      }
    }
    default:
      return state
  }
}
