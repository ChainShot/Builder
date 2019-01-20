const fs = require('fs-extra');
const path = require('path');

// reads a directory path into memory
async function build(dirPath, memory = {}) {
  const dirents = await fs.readdir(dirPath, { withFileTypes: true });
  const files = dirents.filter(x => !x.isDirectory()).map(x => x.name);
  const folders = dirents.filter(x => x.isDirectory()).map(x => x.name);
  for(let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(dirPath, file);
    memory[file] = (await fs.readFile(filePath)).toString();
  }
  for(let i = 0; i < folders.length; i++) {
    const folder = folders[i];
    const folderPath = path.join(dirPath, folder);
    memory[folder] = {};
    await buildMemory(folderPath, memory[folder]);
  }
  return memory;
}

// given a directory memory created from 'buildMemory'
// this will rebuild the directory in dirPath
async function write(dirPath, memory) {
  const keys = Object.keys(memory);
  await fs.ensureDir(dirPath);
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = memory[key];
    if(typeof value === 'object') {
      const folderPath = path.join(dirPath, key);
      await writeMemory(folderPath, value);
    }
    if(typeof value === 'string') {
      const filePath = path.join(dirPath, key);
      await fs.writeFile(filePath, value);
    }
  }
}

module.exports = {
  write, build
}
