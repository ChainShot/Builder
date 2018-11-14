const MultiSig = artifacts.require('MultiSig');
contract('MultiSig', function(accounts) {
    let contract;
    let _owners = [];
    let _creator = accounts[0];
    let _beneficiary = accounts[6];
    for(let i = 0; i < 3; i++) {
        _owners.push(accounts[i]);
    }
    let _required = 2;
    describe('Cleanup Tests', function() {
        beforeEach(async () => {
            contract = await MultiSig.new(_owners, _required);
        });

        it('should try to execute transaction after confirming', async function() {
            const ether = 1;
            await contract.sendTransaction({from: accounts[1], value: web3.toWei(ether, 'ether')});
            await contract.submitTransaction(_beneficiary, web3.toWei(0.5, 'ether'), {
                from: _creator
            })

            await contract.confirmTransaction(0, {from: accounts[1]});
            let txn = await contract.transactions.call(0);
            assert.equal(txn[2], true);
        })

        it('should not call addTransaction externally', async function() {
            assert.equal(undefined, contract.addTransaction);
        })
    });
});