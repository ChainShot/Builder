import {
  OPEN_FOLDER,
  CLOSE_FOLDER,
  OPEN_SIDEBAR_STAGE,
  CLOSE_SIDEBAR_STAGE,
  OPEN_SIDEBAR_CONTAINER,
  CLOSE_SIDEBAR_CONTAINER,
} from '../actionTypes';

const initialState = {
  stagesOpen: [],
  foldersOpen: [],
  containerOpen: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_FOLDER: {
      const { folderPath, stageId } = action.payload;
      return {
        ...state,
        foldersOpen: state.foldersOpen.concat({ stageId, folderPath })
      }
    }
    case CLOSE_FOLDER: {
      const { folderPath, stageId } = action.payload;
      const idx = state.foldersOpen.findIndex(x => x.stageId === stageId && x.folderPath === folderPath);
      return {
        ...state,
        foldersOpen: [
          ...state.foldersOpen.slice(0, idx),
          ...state.foldersOpen.slice(idx+1),
        ]
      }
    }
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
    case OPEN_SIDEBAR_STAGE: {
      const { stageId } = action.payload;
      return {
        ...state,
        stagesOpen: state.stagesOpen.concat(stageId),
      }
    }
    case CLOSE_SIDEBAR_STAGE: {
      const { stageId } = action.payload;
      const idx = state.stagesOpen.indexOf(stageId);
      return {
        ...state,
        stagesOpen: [
          ...state.stagesOpen.slice(0, idx),
          ...state.stagesOpen.slice(idx+1),
        ],
      }
    }
    default:
      return state
  }
}
