const {MODEL_DB} = require('./constants');

// creates a bunch of blank lookup tables for the collections
const blankLookups = () => {
  return Object.keys(MODEL_DB).reduce((lookup, key) => {
    return {
      [MODEL_DB[key]]: {},
      ...lookup,
    }
  }, {});
}

// creates a bunch of blank arrays for the collections
const blankArrays = () => {
  return Object.keys(MODEL_DB).reduce((lookup, key) => {
    return {
      [MODEL_DB[key]]: [],
      ...lookup,
    }
  }, {});
}

module.exports = {
  blankLookups,
  blankArrays,
}
