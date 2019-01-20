const CLIEngine = require('eslint').CLIEngine;

const cli = new CLIEngine({
  fix: process.argv.slice(2).indexOf('--fix') >= 0,
});
const report = cli.executeOnFiles(['src/**/*.{js,jsx,mjs}']);
const formatter = cli.getFormatter();

// persist changed files when using --fix option
CLIEngine.outputFixes(report);
console.log(formatter(report.results));

if ((report.errorCount + report.warningCount) > 0) {
  process.exit(1);
}
