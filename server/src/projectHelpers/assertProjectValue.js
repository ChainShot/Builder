module.exports = (value) => {
  if(!value) throw new Error("Cannot resolve project due to an empty value.");
  return value;
}
