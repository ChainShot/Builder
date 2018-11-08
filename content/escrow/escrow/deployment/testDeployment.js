let assert = require('chai').assert;
import {_testAccounts, web3} from '../web3Util';

const [arbiter, beneficiary, depositor] = _testAccounts;
const deploy = require('../deploy.js').default;
describe('deploy contract', () => {
    const value = web3.utils.toBN(web3.utils.toWei('1', 'ether'));
    let promise = deploy(value, arbiter.address, beneficiary.address, depositor.address);

    it('should return a promise', () => {
        assert(promise.then);
        assert(promise.catch);
    });

    it('should deploy to address', async () => {
        const contract = await promise;
        assert(contract.options.address);
    });

    it('should store the ether', async () => {
        const contract = await promise;
        const {address} = contract.options;
        const balance = await web3.eth.getBalance(address);
        assert.equal(balance.toString(), value.toString());
    });
});
