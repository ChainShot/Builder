import {
  OPEN_FOLDER,
  CLOSE_FOLDER,
  OPEN_CODE_FILE,
  CLOSE_CODE_FILE,
  OPEN_SIDEBAR_STAGE,
  CLOSE_SIDEBAR_STAGE,
  OPEN_SIDEBAR_CONTAINER,
  CLOSE_SIDEBAR_CONTAINER,
} from '../actionTypes';

const initialState = {
  stagesOpen: [],
  foldersOpen: [],
  codeFilesOpen: [],
  containerOpen: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_CODE_FILE: {
      const { id, stageId } = action.payload;
      return {
        ...state,
        codeFilesOpen: state.codeFilesOpen.concat({ id, stageId })
      }
    }
    case CLOSE_CODE_FILE: {
      const { id, stageId } = action.payload;
      const idx = state.codeFilesOpen.findIndex(x => x.id === id && x.stageId === stageId);
      return {
        ...state,
        codeFilesOpen: [
          ...state.codeFilesOpen.slice(0, idx),
          ...state.codeFilesOpen.slice(idx+1),
        ]
      }
    }
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
