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
    describe('Execute Transaction Tests', function() {
        beforeEach(async () => {
            contract = await MultiSig.new(_owners, _required);
        });

        it('should return true if the required threshold is met for a transaction', async function() {
            await contract.submitTransaction(_beneficiary, 100, {
                from: _creator
            });

            await contract.confirmTransaction(0, {from: accounts[1]});
            let confirmed = await contract.isConfirmed(0);

            assert.equal(confirmed, true);
        });

        it('should return false if the required threshold is not met for a transaction', async function() {
            await contract.submitTransaction(_beneficiary, 100, {
                from: _creator
            });

            let confirmed = await contract.isConfirmed(0);

            assert.equal(confirmed, false);
        });

        it('should accept funds', async function() {
            const ether = 1;
            await contract.sendTransaction({from: accounts[1], value: web3.toWei(ether, 'ether')});
            let balance = await web3.eth.getBalance(contract.address);
            assert.equal(web3.fromWei(balance.toNumber(), 'ether'), ether);
        });
    });
});