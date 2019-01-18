const {
  mockCollections,
  writtenModelsLookup,
  writtenModels,
  writtenFiles,
  removedModels,
  removedFiles,
  renamed,
  copied,
} = require('./testData');

const configDocumentReader = (collection) => {
  return Object.keys(mockCollections[collection]).map(x => mockCollections[collection][x]);
}

const fileRemove = (filePath) => {
  removedFiles[filePath] = true;
}

const configRemove = (collection, id) => {
  delete mockCollections[collection][id];
  removedModels[collection][id] = true;
}

const configResolver = (collection, id) => {
  return mockCollections[collection][id];
}

const configReadWrite = (collection, id, transformFn) => {
  const transformed = transformFn(mockCollections[collection][id]);
  mockCollections[collection][id] = transformed;
  return transformed;
}

const configWriter = (collection, props) => {
  writtenModelsLookup[collection] = { [props.id]: props };
  writtenModels[collection].push(props);
  mockCollections[collection][props.id] = props;
  return props;
}

const fileWriter = (filePath, props) => {
  writtenFiles[filePath] = props;
  return props;
}

const directoryRemove = () => {}

const exists = (filePath) => {
  return writtenFiles[filePath];
}

const rename = (previousPath, newPath) => {
  renamed.push({
    previousPath,
    newPath
  });
}

const copy = (previousPath, newPath) => {
  copied.push({
    previousPath,
    newPath
  });
}

module.exports = {
  configWriter,
  configReadWrite,
  fileWriter,
  fileRemove,
  configRemove,
  directoryRemove,
  configDocumentReader,
  configResolver,
  rename,
  copy,
  exists,
}
