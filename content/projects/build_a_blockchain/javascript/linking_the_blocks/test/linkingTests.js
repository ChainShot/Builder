import Blockchain from '../Blockchain';
import Block from '../Block';
const assert = require('assert');
const SHA256 = require("crypto-js/sha256");

let block;
let blockchain;
describe('Linking Blocks', function () {
    beforeEach(() => {
        block = new Block();
        blockchain = new Blockchain();
    })

    describe('adding a previous hash', function() {
        it('should change the current hash', function() {
            const initialHash = block.toHash().toString();
            block.previousHash = SHA256("dans new hash").toString();
            const newHash = block.toHash().toString();
            assert.notEqual(initialHash, newHash);
        })
    })

    describe('adding a new block to our blockchain', function () {
        it('should change the current hash', function () {
            const initialHash = block.toHash().toString();
            blockchain.addBlock(block);
            const newHash = block.toHash().toString();
            assert.notEqual(initialHash, newHash);
        })
    })
});