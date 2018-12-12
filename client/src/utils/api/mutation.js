import api from './';

const apiMutation = (query, variables) => {
  return api.post("graphql", {query, variables}).then(({ data: { errors, data } }) => {
    if(errors) {
      // TODO: turn this alert into a component for better error displays
      alert("GraphQL POST error:\n" + errors.map(x => x.message).join("\n"));
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
