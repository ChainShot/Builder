const Blockchain = require('../Blockchain').default;
const Block = require('../Block').default;
const assert = require('assert');

describe('Blockchain', function() {
  let blockchain;
  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain.addBlock(new Block("Dan"));
    blockchain.addBlock(new Block("Peter"));
    blockchain.addBlock(new Block("James"));
  });
  
  it('should be considered valid', function() {
    assert(blockchain.isValid());
  });

  describe('tampering with previousHashes', function() {
    beforeEach(() => {
      blockchain.chain[1].previousHash = blockchain.chain[2].hash;
    });

    it('should not be considered valid', function() {
      assert(!blockchain.isValid());
    });
  });
  describe('tampering with data', function() {
    beforeEach(() => {
      blockchain.chain[0].data = "Something Else";
    });

    it('should not be considered valid', function() {
      assert(!blockchain.isValid());
    });
  });
});
