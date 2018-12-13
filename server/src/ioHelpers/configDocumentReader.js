module.exports = (transaction) => {
  const configReader = require('./configReader')(transaction);
  const configResolver = require('./configResolver')(transaction);

  const configDocumentReader = async (collection) => {
    const ids = await configReader(collection);
    return Promise.all(ids.map(x => configResolver(collection, x)));
  }

  return configDocumentReader;
}
