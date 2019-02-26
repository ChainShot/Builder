import {
  SET_ACTIVE_TAB,
  OPEN_TAB,
  CLOSE_TAB,
} from '../actionTypes';

const initialState = {
  tabsOpen: [],
  activeTabIdx: 0,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_TAB: {
      const { idx } = action.payload;
      return {
        ...state,
        activeTabIdx: idx,
      }
    }
    case OPEN_TAB: {
      const { type, id, stageId } = action.payload;
      return {
        ...state,
        tabsOpen: state.tabsOpen.concat({ type, id, stageId }),
        activeTabIdx: state.tabsOpen.length,
      }
    }
    case CLOSE_TAB: {
      const { type, id, stageId } = action.payload;
      const idx = state.tabsOpen.findIndex(x => x.type === type && x.id === id && x.stageId === stageId);
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
