function deeplyEqualObjects(a, b) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if(aKeys.length !== bKeys.length) return false;
  for(let i = 0; i < aKeys.length; i++) {
    const key = aKeys[i];
    if(a[key] && typeof a[key] === 'object') {
      if(!deeplyEqualObjects(a[key], b[key])) {
        return false;
      }
    }
    else if(a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}

export default deeplyEqualObjects;
