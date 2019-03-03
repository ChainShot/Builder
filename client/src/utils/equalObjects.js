function equalObjects(a,b) {
  if(!a || !b) return false;
  const aKeys = Object.keys(a);
  if(aKeys.length !== Object.keys(b).length) return false;
  for(let i = 0; i < aKeys.length; i++) {
    const key = aKeys[i];
    if(a[key] !== b[key]) return false;
  }
  return true;
}

export default equalObjects;
