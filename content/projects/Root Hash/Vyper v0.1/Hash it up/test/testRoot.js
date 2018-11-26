const Root = artifacts.require('Root.vyper');
const { sha3 } = web3;
const HASH_SIZE = 32;
const crypto = require('crypto');
const genHash = (l=HASH_SIZE) => crypto.randomBytes(l);
const hexify = (buff) => '0x' + buff.toString('hex');

function findRoot(hash) {
  let computed = hash.slice(0, HASH_SIZE);
  for(let i = HASH_SIZE; i < hash.length; i += HASH_SIZE) {
    let rhs = hash.slice(i, i + HASH_SIZE);
    let hex = Buffer.concat([computed, rhs]).toString('hex');
    computed = Buffer.from(sha3(hex, {encoding: 'hex'}).slice(2), 'hex');
  }
  return hexify(computed.toString('hex'));
}

contract('Test Root', () => {
  let contract;
  beforeEach(async () => {
    contract = await Root.new();
  });

  
  describe('with a single hash', () => {
    it('should return the single hash', async () => {
      let hash = genHash();
      let hex = hexify(hash);
      let actual = await contract.findRoot(hex);
      assert.equal(actual, hex);
    });
  });

  describe('with two hashes', () => {
    it('should hash together the values', async () => {
      let hash = genHash(HASH_SIZE * 2);
      let expectedRoot = findRoot(hash);
      let actual = await contract.findRoot(hexify(hash));
      assert.equal(actual, expectedRoot);
    });
  });

  describe('with three hashes', () => {
    it('should hash together the values', async () => {
      let hash = genHash(HASH_SIZE * 3);
      let expectedRoot = findRoot(hash);
      let actual = await contract.findRoot(hexify(hash));
      assert.equal(actual, expectedRoot);
    });
  });

  describe('with four hashes', () => {
    it('should hash together the values', async () => {
      let hash = genHash(HASH_SIZE * 4);
      let expectedRoot = findRoot(hash);
      let actual = await contract.findRoot(hexify(hash));
      assert.equal(actual, expectedRoot);
    });
  });

  describe('with ten hashes', () => {
    it('should hash together the values', async () => {
      let hash = genHash(HASH_SIZE * 10);
      let expectedRoot = findRoot(hash);
      let actual = await contract.findRoot(hexify(hash));
      assert.equal(actual, expectedRoot);
    });
  });
});
