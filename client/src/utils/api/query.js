import api from './';

const apiQuery = (query, variables) => {
  return api.post("graphql", {query, variables}).then(({ data: { errors, data } }) => {
    if(errors) {
      alert("GraphQL QUERY error:\n" + errors.map(x => x.message).join("\n"));
      return Promise.reject(errors);
    }
    return data;
  });
}

export default apiQuery;
