import api from './';

const apiMutation = (query, variables) => {
  return api.post("graphql", {query, variables}).then(({ data: { errors, ...props } }) => {
    if(errors) {
      alert(JSON.stringify(errors));
    }
    const keys = Object.keys(props);
    // for single mutations simply return the data
    if(keys.length === 1) return props[keys[0]];
    // for multiple mutations return all of them with function names as keys
    return props;
  });
}

export default apiMutation;
