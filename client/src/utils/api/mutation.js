import api from './';
import Error from '../../components/dialogs/Error';
import * as dialog from '../dialog';

const apiMutation = (query, variables) => {
  return api.post("graphql", {query, variables}).then(({ data: { errors, data } }) => {
    if(errors) {
      const messages = errors.map(x => x.message);
      const errorMessage = messages.length > 4 ? (messages.slice(0,4).join("\n") + '...') : messages.join("\n");
      const message = `Failed to save your data:\n\n${errorMessage}`;
      dialog.open(Error, { message });
      return Promise.reject(errors);
    }
    const keys = Object.keys(data);
    // for single mutations simply return the data
    if(keys.length === 1) return data[keys[0]];
    // for multiple mutations return all of them with function names as keys
    return data;
  });
}

export default apiMutation;
