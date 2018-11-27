function camelize(str) {
  if(str[0] === '_') return str.slice(1); // e.g. _id or _type
  let parts = str.split("_");
  return parts.slice(1).reduce((str, cur) => {
    return str + cur[0].toUpperCase() + cur.slice(1);
  }, parts[0]);
}

module.exports = camelize;
