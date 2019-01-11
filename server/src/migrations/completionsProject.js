const { LOOKUP_KEY, CONFIG_DIR } = require('../config');
const findStageFilePath = require('../projectHelpers/findStageFilePath');
const fs = require('fs-extra');
const path = require('path');
const prettifyJSON = require('../utils/prettifyJSON');

// moves the completionMessage property from the config document
// into its appropriate spot under projects
async function runMigration() {
  const stagePath = path.join(CONFIG_DIR, 'stages');
  const stageNames = await fs.readdir(stagePath);
  const stages = (await Promise.all(stageNames.map(x => fs.readFile(path.join(stagePath, x))))).map(x => JSON.parse(x.toString()))
  for(let i = 0; i < stages.length; i++) {
    const stage = stages[i];
    const completionMessage = stage.completionMessage || "";
    stage.completionMessage = LOOKUP_KEY;
    await fs.writeFile(path.join(stagePath, stageNames[i]), prettifyJSON(stage));
    const stageProjectPath = await findStageFilePath(stage);
    const completionPath = path.join(stageProjectPath, "completionMessage.md");
    await fs.writeFile(completionPath, completionMessage);
  }
}

runMigration();
