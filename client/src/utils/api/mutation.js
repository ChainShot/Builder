import api from './';
import Error from '../../components/dialogs/Error';
import * as dialog from '../dialog';
import {setStageContainer} from 'redux/actions';
import store from 'redux/store';

function reduceObjPath(obj, path) {
  return path.split(".").reduce((curObj, key) => {
    return curObj[key];
  }, obj);
}

const apiMutation = (query, variables, reloadStageContainer = false) => {
  return api.post("graphql", {query, variables}).then(({ data: { errors, data } }) => {
    if(errors) {
      const messages = errors.map(x => x.message);
      const errorMessage = messages.length > 4 ? (messages.slice(0,4).join("\n") + '...') : messages.join("\n");
      const message = `Failed to make request:\n\n${errorMessage}`;
      dialog.open(Error, { message });
      return Promise.reject(errors);
    }

    const keys = Object.keys(data);
    if(reloadStageContainer) {
      let stageContainer;
      if(typeof reloadStageContainer === "boolean") {
        stageContainer = data[keys[0]].stageContainer;
      }
      else if(typeof reloadStageContainer === "string") {
        stageContainer = reduceObjPath(data, reloadStageContainer);
      }
      if(stageContainer) {
        store.dispatch(setStageContainer(stageContainer));
      }
      else {
        console.warn('Query should have set stageContainer, however none was returned', {
          query, variables
        });
      }
    }

    if(keys.length === 1) {
      // for single mutations simply return the data
      return data[keys[0]];
    }

    // for multiple mutations return all of them with function names as keys
    return data;
  });
}

export default apiMutation;
