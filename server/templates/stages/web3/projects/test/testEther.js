import { _testAccounts } from '../setup';
import getEther from '../getEther';
const assert = require('assert');

describe('getEther', function() {
    it('should tell me the balance of an account in ether', async () => {
        const balance = await getEther(_testAccounts[0].address);
        assert.equal(balance, 10);
    });
});