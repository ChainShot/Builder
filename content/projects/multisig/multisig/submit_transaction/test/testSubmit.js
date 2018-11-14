const MultiSig = artifacts.require('MultiSig');
contract('MultiSig', function(accounts) {
    let contract;
    let _owners = [];
    let _creator = accounts[0];
    let _beneficiary = accounts[4];
    for(let i = 0; i < 3; i++) {
        _owners.push(accounts[i]);
    }
    let zero = '0x0000000000000000000000000000000000000000';
    let _required = 2;

    describe('Submit Transaction Tests', function() {
        beforeEach(async () => {
            contract = await MultiSig.new(_owners, _required);
        });

        it('should add a transaction', async function() {
            await contract.submitTransaction(_beneficiary, 100, {
                from: _creator
            })
            let tx = await contract.transactions.call(0);
            let address = tx[0];
            assert.notEqual(address, zero);
        });

        it('should confirm a transaction', async function() {
            await contract.submitTransaction(_beneficiary, 100, {
                from: _creator
            })

            let confirmed = await contract.getConfirmations.call(0)
            assert.equal(confirmed[0], _creator);
        });
    })
});