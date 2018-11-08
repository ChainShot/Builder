const {concatHash, concatLetters, testTree} = require('./testUtil');
const MerkleTree = require('../index');

describe('merkle', function() {
  it('should handle the base case', function() {
    const leaves = ['A'];
    const expectedHash = "559aead08264d5795d3909718cdd05abd49572e84fe55590eef31a88a08fdffd";
    const expectedLetters = "A";
    testTree(MerkleTree, leaves, expectedHash, expectedLetters);
  });
  
  it('should create a root from two hashes', function() {
    const leaves = ['A', 'B'];
    const expectedHash = "63956f0ce48edc48a0d528cb0b5d58e4d625afb14d63ca1bb9950eb657d61f40";
    const expectedLetters = "Hash(A + B)";
    testTree(MerkleTree, leaves, expectedHash, expectedLetters);
  });

  it('should create a root from four hashes', function() {
    const leaves = ['A', 'B', 'C', 'D'];
    const expectedHash = "1b3faa3fcc5ed50cd8592f805c6f8fce976b8582c739b26a6f3613b7f9b13617";
    const expectedLetters = "Hash(Hash(A + B) + Hash(C + D))";
    testTree(MerkleTree, leaves, expectedHash, expectedLetters);
  });
});
