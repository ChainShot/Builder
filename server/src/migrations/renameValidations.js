const { PROJECTS_DIR } = require('../config');
const path = require('path');
const fs = require('fs-extra');
const prettifyJSON = require('../utils/prettifyJSON');

// transforms the validations property
// validation type => interfaceType
// argument type => staticType
async function runMigration() {
  const groups = await fs.readdir(PROJECTS_DIR);
  for(let i = 0; i < groups.length; i++) {
    const group = groups[i];
    const versionsPath = path.join(PROJECTS_DIR, group);
    const versions = await fs.readdir(versionsPath);
    for(let j = 0; j < versions.length; j++) {
      const version = versions[j];
      const stagesPath = path.join(versionsPath, version)
      const stages = await fs.readdir(stagesPath);
      for(let k = 0; k < stages.length; k++) {
        const stage = stages[k];
        const validationsPath = path.join(stagesPath, stage, 'validations.json');
        if(await fs.exists(validationsPath)) {
          const contents = (await fs.readFile(validationsPath)).toString();
          if(contents) {
            let validations = JSON.parse(contents);
            validations.forEach((validation) => {
              validation.interfaceType = validation.type;
              delete validation.type;
              (validation.inputs || []).forEach(input => {
                input.staticType = input.type;
                delete input.type;
              });
              (validation.outputs || []).forEach(output => {
                output.staticType = output.type;
                delete output.type;
              });
            });
            await fs.writeFile(validationsPath, prettifyJSON(validations));
          }
        }
      }
    }
  }
}

runMigration();
