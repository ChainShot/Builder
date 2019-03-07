import {
  OPEN_TAB,
  CLOSE_TAB,
  CLOSE_TABS,
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
    case CLOSE_TABS: {
      const definedProps = ['type', 'id', 'stageId'].filter((k) => action.payload[k]);
      // filter any tabs out that match all the defined props
      const remainingTabs = state.tabsOpen.filter(x => {
        for(let i = 0; i < definedProps.length; i++) {
          const prop = definedProps[i];
          if(x[prop] !== action.payload[prop]) {
            return true;
          }
        }
        return false;
      });
      const totalTabs = remainingTabs.length;
      return {
        ...state,
        tabsOpen: remainingTabs,
        activeTabIdx: state.activeTabIdx >= totalTabs ? (totalTabs - 1) : state.activeTabIdx,
      }
    }
    case CLOSE_TAB: {
      const { type, id, stageId } = action.payload;
      const idx = state.tabsOpen.findIndex(x => x.type === type && x.id === id && x.stageId === stageId);
      const currActive = state.activeTabIdx;
      const activeTabIdx = (currActive === state.tabsOpen.length-1) ? (currActive-1) : currActive;
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
