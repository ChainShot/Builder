const {assert} = require("chai");
const {hashProof, sha256, concatHash, concatLetters} = require('./testUtil');
const MerkleTree = require('../index');

describe('merkle proof', function() {
  const leaves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const root = 'eb100814abc896ab18bcf6c37b6550eeadeae0c312532286a4cf4be132ace526';
  const hashTree = new MerkleTree(leaves.map(sha256), concatHash);
  const lettersTree = new MerkleTree(leaves, concatLetters);

  describe('for each leaf', function() {
    leaves.forEach((leaf, i) => {
      it(`should return a proof that calculates the root from leaf ${leaves[i]}`, function() {
        const proof = hashTree.getProof(i);
        const hashedProof = hashProof(leaf, proof).toString('hex');
        if(hashedProof !== root) {
          const lettersProof = lettersTree.getProof(i);
          console.log(
            "The resulting hash of your proof is wrong. \n" +
            `We were expecting: ${root} \n` +
            `We recieved: ${hashedProof} \n` +
            `In ${leaves.join('')} Merkle tree, the proof of ${leaves[i]} you gave us is: \n` +
            `${JSON.stringify(lettersProof, null, 2)}`
          );
        }
        assert.equal(hashedProof, root);
      });
    });
  });
});
