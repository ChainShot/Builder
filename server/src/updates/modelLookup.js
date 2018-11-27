const schema = require('../schema');
const { graphql } = require('graphql');

const findGroup = `
query findStageContainerGroup($title: String) {
  stageContainerGroup(title: $title) {
    stageContainers {
      version
      id
    }
  }
}
`;

const lookups = [
  {
    template: '{groupTitle}/{version}/intro.md',
    lookup: async ({ groupTitle, version, file }) => {
      const { data } = await graphql(schema, findGroup, null, null, { title: groupTitle });
      const { id } = data.stageContainerGroup.stageContainers.filter(x => x.version == version)[0];
      return { modelType: 'stageContainer', id };
    }
  },
  {
    template: '{groupTitle}/{version}/{stageTitle}/[details.md|task.md|validations.json]',
    lookup: ({ groupTitle, version, stageTitle, file }) => {
      console.log(2, { groupTitle, version, file })
    }
  },
  {
    template: '{groupTitle}/{version}/{stageTitle}/**',
    lookup: ({ groupTitle, version, stageTitle, file }) => {
      console.log(3, { groupTitle, version, file })
    }
  }
]

const VAR_REGEX = /^{(\w*)}$/;
const OPTIONS_REGEX = /^\[([\.\w|]*)\]$/;
const isVariable = (x) => VAR_REGEX.test(x);
const getVariable = (x) => x.match(VAR_REGEX)[1];
const isOptions = (x) => OPTIONS_REGEX.test(x);
const matchOption = (x) => {
  const options = x.match(OPTIONS_REGEX)[1].split('|');
  return options.filter(y => x === y)[0];
}

const modelLookup = async (name) => {
  for(let i = 0; i < lookups.length; i++) {
    const { template, lookup } = lookups[i];
    const parts = template.split('/');
    const nameParts = name.split('/');
    let match = true;
    const matches = {};
    for(let j = 0; j < parts.length; j++) {
      const part = parts[j];
      const namePart = nameParts[j];
      if(!namePart) {
        match = false;
        break;
      }
      if(isVariable(part)) {
        matches[getVariable(part)] = namePart;
      }
      else if(part == '**') {
        matches.file = nameParts.split('/').slice(j).join('/');
      }
      else if(part === namePart) {
        matches.file = namePart;
      }
      else if(isOptions(part) && matchOption(namePart)) {
        matches.file = namePart;
      }
      else {
        match = false;
      }
    }
    if(match) return lookup(matches);
  }
}

module.exports = modelLookup;
