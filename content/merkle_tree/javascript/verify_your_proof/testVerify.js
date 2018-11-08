const {assert} = require("chai");
const {concatHash, sha256} = require('./testUtil');
const MerkleTree = require('../index');
const verify = require('../verify');

describe('merkle proof verification', function() {
  describe('a given merkle tree', function() {
    const leaves = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'].map(sha256);
    const tree = new MerkleTree(leaves, concatHash);

    describe('untampered proofs', function() {
      leaves.forEach((_, i) => {
        it(`should verify the proof for leaf index ${i}`, function() {
          const proof = tree.getProof(i);
          assert.equal(verify(proof, leaves[i], tree.getRoot(), concatHash), true);
        });
      });
    });

    describe('tampered proofs', function() {
      describe('verifying a different node with a proof', function() {
        it('should not verify the proof', function() {
          let proof = tree.getProof(2);
          assert.equal(verify(proof, leaves[3], tree.getRoot(), concatHash), false);
        });
      });

      describe('verifying a different root', function() {
        it('should not verify the proof', function() {
          let proof = tree.getProof(2);
          assert.equal(verify(proof, leaves[2], sha256("root"), concatHash), false);
        });
      });

      describe('flipping a nodes position', function() {
        it('should not verify the proof', function() {
          let proof = tree.getProof(3);
          proof[1].left = !proof[1].left;
          assert.equal(verify(proof, leaves[3], tree.getRoot(), concatHash), false);
        });
      });

      describe('editing a hash', function() {
        it('should not verify the proof', function() {
          let proof = tree.getProof(5);
          proof[2].data = sha256('edited');
          assert.equal(verify(proof, leaves[5], tree.getRoot(), concatHash), false);
        });
      });
    });
  });
});
