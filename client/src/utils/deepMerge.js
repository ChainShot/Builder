function deepMerge(props, dest) {
  const merged = Array.isArray(props) ? [ ...dest ] : { ...dest };
  const keys = Object.keys(props);
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if(props[key] && typeof props[key] === 'object') {
      merged[key] = deepMerge(props[key], dest[key]);
    }
    else {
      merged[key] = props[key];
    }
  }
  return merged;
}

export default deepMerge;
