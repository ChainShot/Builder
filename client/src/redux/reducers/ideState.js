import {
  OPEN_TAB,
  CLOSE_TAB,
  SET_ACTIVE_TAB,
  CLOSE_OTHER_TABS,
  CLOSE_TABS_TO_THE_RIGHT,
} from '../actionTypes';

const initialState = {
  tabsOpen: [],
  activeTabIdx: 0,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CLOSE_TABS_TO_THE_RIGHT: {
      const { type, id, stageId } = action.payload;
      const idx = state.tabsOpen.findIndex(x => x.type === type && x.id === id && x.stageId === stageId);
      return {
        ...state,
        tabsOpen: state.tabsOpen.slice(0, idx+1),
        activeTabIdx: state.activeTabIdx > idx ? idx : state.activeTabIdx,
      }
    }
    case CLOSE_OTHER_TABS: {
      const { type, id, stageId } = action.payload;
      const tab = state.tabsOpen.find(x => x.type === type && x.id === id && x.stageId === stageId);
      return {
        ...state,
        tabsOpen: [tab],
        activeTabIdx: 0,
      }
    }
    case SET_ACTIVE_TAB: {
      const { idx } = action.payload;
      return {
        ...state,
        activeTabIdx: idx,
      }
    }
    case OPEN_TAB: {
      const { type, id, stageId } = action.payload;
      const idx = state.tabsOpen.findIndex(x => x.type === type && x.id === id && x.stageId === stageId);
      if(idx >= 0) {
        return {
          ...state,
          activeTabIdx: idx,
        }
      }
      return {
        ...state,
        tabsOpen: state.tabsOpen.concat({ type, id, stageId }),
        activeTabIdx: state.tabsOpen.length,
      }
    }
    case CLOSE_TAB: {
      const { type, id, stageId } = action.payload;
      const idx = state.tabsOpen.findIndex(x => x.type === type && x.id === id && x.stageId === stageId);
      const activeTabIdx = ((idx+1) === state.tabsOpen.length) ? idx-1 : state.activeTabIdx;
      return {
        ...state,
        tabsOpen: [
          ...state.tabsOpen.slice(0, idx),
          ...state.tabsOpen.slice(idx+1),
        ],
        activeTabIdx,
      }
    }
    default:
      return state
  }
}
