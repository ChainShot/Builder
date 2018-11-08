const MultiSig = artifacts.require('MultiSig');
contract('MultiSig', function(accounts) {
    let contract;
    let _owners = [];
    let _creator = accounts[0];
    let _theif = accounts[5];
    let _beneficiary = accounts[6];
    for(let i = 0; i < 3; i++) {
        _owners.push(accounts[i]);
    }
    let zero = '0x0000000000000000000000000000000000000000';
    let _required = 2;

    describe('Add Transaction Tests', function() {
        beforeEach(async () => {
            contract = await MultiSig.new(_owners, _required);
        });

        it('should create a new Transaction', async function() {
            await contract.addTransaction(_beneficiary, 100, {
                from: _creator
            })

            let tx = await contract.transactions.call(0);
            let address = tx[0];
            assert.notEqual(address, zero);
        })

        it('should keep count of the amount of transactions', async function() {
            await contract.addTransaction(_beneficiary, 100, {
                from: _creator
            })

            let txCount = await contract.transactionCount.call();
            assert.equal(txCount.toNumber(), 1);
        })

        it('should return a transaction id', async function() {
            await contract.addTransaction(_beneficiary, 100, {
                from: _creator
            })

            let txId = await contract.addTransaction.call(_beneficiary, 100, {
                from: _creator
            })

            assert.equal(txId.toNumber(), 1);
        })

        it('should not add a transaction with a null address', async function() {
            await expectThrow(
                contract.addTransaction(0, 100, {
                    from: _creator
                })
            )
        })
    })
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