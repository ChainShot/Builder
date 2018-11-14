import Blockchain from '../Blockchain';
import Block from '../Block';
const assert = require('assert');

let blockchain;
let newBlock;

describe('Blockchain', function() {
    before(() => {
        blockchain = new Blockchain();
    });

    it('should have an addBlock function', function() {
        assert.equal(typeof blockchain.addBlock, 'function');
    });

    describe('adding new blocks', function() {
        before(() => {
            blockchain.addBlock(new Block("Some data"));
            blockchain.addBlock(new Block("Some other data"));
        });

        it('should be a chain of three blocks', function() {
            assert.equal(blockchain.chain.length, 3);
        })

        it('should set the link to the genesis block', function() {
            assert.equal(blockchain.chain[1].previousHash.toString(), blockchain.chain[0].hash.toString());
        })

        it('should set the link to the genesis block', function () {
            assert.equal(blockchain.chain[2].previousHash.toString(), blockchain.chain[1].hash.toString());
        })
    })
})