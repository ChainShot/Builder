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
    before(async () => {
        contract = await MultiSig.new(_owners, _required);
    });

    describe('Confirm Transaction Tests', function() {
        it('should map owners as valid owners', async function() {
            let isOwner = await contract.validOwners.call(_creator);
            assert.equal(isOwner, true);
        })

        it('should only allow valid owners to confirm transactions', async function() {
            await expectThrow(
                contract.confirmTransaction(0, {from: accounts[4]})
            )
        })

        it('should only confirm transactions that exist', async function() {
            await contract.addTransaction(_beneficiary, 100, {
                from: _creator
            })

            await expectThrow(
                contract.confirmTransaction(1, {from: accounts[1]})
            )
        })

        it('should only let an owner confirm once', async function() {
            await contract.confirmTransaction(0, {from: _creator})
            await expectThrow(
                contract.confirmTransaction(0, {from: _creator})
            )
        })
    });
});

async function expectThrow(promise) {
    const errMsg = 'Expected throw not received';
    try {
        await promise;
    } catch (err) {
        assert(err.toString().includes('revert'), errMsg);
        return;
    }

    assert(false, errMsg);
}