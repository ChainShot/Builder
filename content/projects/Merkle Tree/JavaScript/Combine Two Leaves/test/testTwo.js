const {testTree} = require('./testUtil');
const MerkleTree = require('../index');

describe('merkle', function() {
  it('should create a root from two hashes', function() {
    const leaves = ['A', 'B'];
    const expectedHash = "63956f0ce48edc48a0d528cb0b5d58e4d625afb14d63ca1bb9950eb657d61f40";
    const expectedLetters = "Hash(A + B)";
    testTree(MerkleTree, leaves, expectedHash, expectedLetters);
  });
});
