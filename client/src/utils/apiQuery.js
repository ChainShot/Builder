import api from './api';

const apiQuery = (query, variables) => {
  return api.post("graphql", {query, variables}).then(({ errors, data }) => {
    if(errors) {
      alert(JSON.stringify(errors));
    }
    return data;
  });
}

export default apiQuery;
