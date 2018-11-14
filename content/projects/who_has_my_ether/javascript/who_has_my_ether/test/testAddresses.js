import { buildAccountTransactions, accountAddressesSentTo, isFunction, isPromiseLike, newAddress, _testAccounts } from '../setup';
import findAddresses from '../findAddresses';
const assert = require('assert');

describe('findAddresses', function() {
  it('should be a function', function() {
    assert(isFunction(findAddresses), 'findAddresses should be a function');
  });
  it('should return a promise', function() {
    assert(isPromiseLike(findAddresses(newAddress())), 'value returned from findAddresses is not promise-like');
  });
  describe('after building account transactions', function() {
    before(async function() {
        await buildAccountTransactions();
    });
    it('should work for an account with no transactions', async function() {
        const fromAddress = newAddress();
        const actual = await findAddresses(fromAddress);
        assert.equal(actual.length, 0, `No transactions were sent from address ${fromAddress}`);
    });
    it('should work for an account who sent one transaction per block', async function() {
        const fromAddress = _testAccounts[0].address;
        const actual = await findAddresses(fromAddress)
        const expected = accountAddressesSentTo[fromAddress];
        assert.equal(actual.length, expected.length, `The ether was sent to ${expected.length} accounts. Make sure you look through every block!`);
        expected.forEach(address => {
            assert(actual.indexOf(address) > -1, `The ether was sent to ${address}, but this address was not found in your resolved addresses`)
        });
    });
    it('should work for an account who sent multiple transactions per block', async function() {
        const fromAddress = _testAccounts[1].address;
        const actual = await findAddresses(fromAddress);
        const expected = accountAddressesSentTo[fromAddress];
        assert.equal(actual.length, expected.length, `The ether was sent to ${expected.length} accounts. Make sure you check each transaction in the block!`);
        expected.forEach(address => {
            assert(actual.indexOf(address) > -1, `The ether was sent to ${address}, but this address was not found in your resolved addresses`)
        });
    });
  });
});