const MultiSig = artifacts.require('MultiSig');
contract('MultiSig', function(accounts) {
    let contract;
    let _owners = [];
    let _creator = accounts[0];
    for(let i = 0; i < 3; i++) {
        _owners.push(accounts[i]);
    }
    let _required = 2;
    before(async () => {
        contract = await MultiSig.new(_owners, _required);
    });

    describe('Contructor Stage Tests', function() {
        it('should set an array of owners', async function() {
            let last = _owners.length - 1;
            let firstOwner = await contract.owners.call(0);
            let lastOwner = await contract.owners.call(last);
            assert.equal(_owners[last], lastOwner)
            assert.equal(_creator, firstOwner);
        });

        it('should set required confirmations', async function() {
            let required = await contract.required.call();
            assert.equal(_required, required.toNumber());
        });

        it('should set at least 1 owner', async function() {
            await expectThrow(
                MultiSig.new([], 1)
            )
        })

        it('should set at least 1 confirmation requirement', async function() {
            await expectThrow(
                MultiSig.new(_owners, 0)
            )
        })

        it('should not set required confirmations greater than amount of owners', async function() {
            await expectThrow(
                MultiSig.new(_owners, _owners.length + 1)
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
