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

  it('should handle three hashes', function() {
    const leaves = ['A', 'B', 'C'];
    const expectedHash = "dbe11e36aa89a963103de7f8ad09c1100c06ccd5c5ad424ca741efb0689dc427";
    const expectedLetters = "Hash(Hash(A + B) + C)";
    testTree(MerkleTree, leaves, expectedHash, expectedLetters);
  });
  
  it('should handle five hashes', function() {
    const leaves = ['A', 'B', 'C', 'D', 'E'];
    const expectedHash = "8e5eeb6f73b5c475dbcd8ea8288a62075e64464254999d1ac59b3a0ad398ec35";
    const expectedLetters = "Hash(Hash(Hash(A + B) + Hash(C + D)) + E)";
    testTree(MerkleTree, leaves, expectedHash, expectedLetters);
  });

  it('should handle seven hashes', function() {
    const leaves = ['A', 'B', 'C', 'D', 'E', 'F' ,'G'];
    const expectedHash = "123b5a4d8e88533817f040984914ab5cf9f5b24b032a421587c85d7926d615fe";
    const expectedLetters = "Hash(Hash(Hash(A + B) + Hash(C + D)) + Hash(Hash(E + F) + G))";
    testTree(MerkleTree, leaves, expectedHash, expectedLetters);
  });
});
