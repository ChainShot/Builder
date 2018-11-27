const MultiSig = artifacts.require('MultiSig');
contract('MultiSig', function(accounts) {
    let contract;
    let _owners = [];
    let _creator = accounts[0];
    let _beneficiary = accounts[1];
    for(let i = 0; i < 3; i++) {
        _owners.push(accounts[i]);
    }
    let _required = 2;
    beforeEach(async () => {
        contract = await MultiSig.new(_owners, _required);
    });

    describe('after creating the first transaction', function() {
		beforeEach(async () => {
            await contract.addTransaction(_beneficiary, 100, {
                from: _creator
            });
            await contract.confirmTransaction(0, {from: _creator});
        });
      
        it('should confirm the transaction', async function() {
            let confirmed = await contract.getConfirmations.call(0);
            assert.equal(confirmed[0], _creator);
        });

        it('should return an array with just the one confirmation address', async function() {
            let confirmed = await contract.getConfirmations.call(0);
	            assertContains(confirmed, _creator);
        });

        describe('after creating the second transaction', function() {
            beforeEach(async () => {
                await contract.addTransaction(_beneficiary, 100, {
                    from: _creator
                });
	            await contract.confirmTransaction(1, {from: _creator});
				await contract.confirmTransaction(1, {from: _beneficiary});
            });

            it('should return an array with two confirmations on the second transaction', async function() {
                let confirmed = await contract.getConfirmations.call(1);
	            assertContains(confirmed, _creator, _beneficiary);
            });

            it('should return an array with one confirmation on the first transaction', async function() {
                let confirmed = await contract.getConfirmations.call(0);
	            assertContains(confirmed, _creator);
            });
        });
    });
});

function assertContains(arr, ...addresses) {
  assert.equal(arr.length, addresses.length, `Returned the wrong number of confirmation addresses`);
  addresses.forEach(address => {
    assert(arr.indexOf(address) >= 0, `Could not find address ${address} in confirmations`);
  });
}