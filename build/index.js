const path = require('path');
const AdmZip = require('adm-zip');
const setupClient = require('./setupClient');
const setupServer = require('./setupServer');

async function build() {
  const base = path.join(__dirname, '..');

  const clientPath = `${base}/client`;
  await setupClient(clientPath);

  const serverPath = `${base}/server`;
  await setupServer(serverPath);

  const output = new AdmZip();
  output.addLocalFolder(`${clientPath}/build`, 'client/build');
  output.addLocalFolder(`${serverPath}`, 'server');
  const versionContent = JSON.stringify({
    version: process.env.TRAVIS_TAG
  }, null, 2);
  zip.addFile("build.json", Buffer.alloc(versionContent.length, versionContent));
  output.writeZip('build.zip');
}

build();
