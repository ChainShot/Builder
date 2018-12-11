function reportWrapper(promiseFn) {
  return async (...args) => {
    try {
      return await promiseFn(...args);
    }
    catch(ex) {
      console.log(ex);
      throw(ex);
    }
  }
}

module.exports = reportWrapper;
