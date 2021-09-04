const path = require('path');
const AdmZip = require('adm-zip');
const setupClient = require('./setupClient');
const setupServer = require('./setupServer');

async function build() {
  const base = path.join(__dirname, '..');

  console.log("Setting up Client Build...");
  const clientPath = `${base}/client`;
  await setupClient(clientPath);

  console.log("Setting up Server Build...");
  const serverPath = `${base}/server`;
  await setupServer(serverPath);

  console.log("Setting up CI Build...");
  const ciPath = `${base}/ci`;
  await setupServer(ciPath);

  console.log("Creating Zip...");
  const output = new AdmZip();
  output.addLocalFolder(`${clientPath}/build`, 'client/build');
  output.addLocalFolder(`${serverPath}`, 'server');
  output.addLocalFolder(`${ciPath}`, 'ci');
  const versionContent = JSON.stringify({
    version: process.env.TRAVIS_TAG
  }, null, 2);
  output.addFile("build.json", Buffer.alloc(versionContent.length, versionContent));

  console.log("Writing Zip...");
  output.writeZip('build.zip');
}

build();
