let assert = require('chai').assert;
const { _testAccounts, web3 } = require('../web3Util');
const [arbiter, beneficiary, depositor] = _testAccounts;
const approve = require('../approve.js').default;
const deploy = require('../deploy.js').default;
describe('approve function', () => {
    let contract;
    before(async () => {
      	const value = web3.utils.toWei('1', 'ether');
        contract = await deploy(value, arbiter.address, beneficiary.address, depositor.address);
    })
  
    it('should return a promise', () => {
        let address = contract.options.address;
        assert(approve(address, arbiter.address).then, 'did not return a promise');
        assert(approve(address, arbiter.address).catch, 'did not return a promise');
    });

    it('should allow the arbiter to approve, transmitting the funds', async () => {
        let address = contract.options.address;
        await approve(address, arbiter.address);
        let contractBalance = await web3.eth.getBalance(address);
        assert.equal(0, contractBalance);
    });
});
