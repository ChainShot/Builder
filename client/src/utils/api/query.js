import api from './';
import ErrorDialog from '../../components/dialogs/ErrorDialog';
import * as dialog from '../dialog';

const apiQuery = (query, variables) => {
  return api.post("graphql", {query, variables}).then(({ data: { errors, data } }) => {
    if(errors) {
      const messages = errors.map(x => x.message);
      const errorMessage = messages.length > 4 ? (messages.slice(0,4).join("\n") + '...') : messages.join("\n");
      const message = `Failed to fetch your data:\n\n${errorMessage}`;
      dialog.open(ErrorDialog, { message });
      return Promise.reject(errors);
    }
    return data;
  });
}

export default apiQuery;
