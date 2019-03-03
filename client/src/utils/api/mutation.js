import api from './';
import Error from '../../components/dialogs/Error';
import * as dialog from '../dialog';
import {setStageContainer} from 'redux/actions';
import store from 'redux/store';

const apiMutation = (query, variables, setContainer = false) => {
  return api.post("graphql", {query, variables}).then(({ data: { errors, data } }) => {
    if(errors) {
      const messages = errors.map(x => x.message);
      const errorMessage = messages.length > 4 ? (messages.slice(0,4).join("\n") + '...') : messages.join("\n");
      const message = `Failed to make request:\n\n${errorMessage}`;
      dialog.open(Error, { message });
      return Promise.reject(errors);
    }
    const keys = Object.keys(data);

    if(keys.length === 1) {
      const mutationReturns = data[keys[0]];
      if(setContainer) {
        const { stageContainer } = mutationReturns;
        if(stageContainer) {
          store.dispatch(setStageContainer(stageContainer));
        }
        else {
          console.warning('Query should have set stageContainer, however none was returned', {
            query, variables
          });
        }
      }
      // for single mutations simply return the data
      return mutationReturns;
    }

    // for multiple mutations return all of them with function names as keys
    return data;
  });
}

export default apiMutation;
