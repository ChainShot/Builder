module.exports = (injections) => {
  const assertNoDuplicates = require('./assertNoDuplicates')(injections);

  async function validate(codeFile) {
    if(codeFile.hasOwnProperty('executablePath')) {
      if(!codeFile.executablePath) {
        throw new Error('Executable Path cannot be blank!');
      }
      await assertNoDuplicates(codeFile);
    }
  }

  return validate;
}
