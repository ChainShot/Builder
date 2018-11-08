const MultiSig = artifacts.require('MultiSig');
contract('MultiSig', function(accounts) {
    let contract;
    let _owners = [];
    let _creator = accounts[0];
    let _beneficiary = accounts[6];
    let _testTransfer = accounts[7];
    for(let i = 0; i < 3; i++) {
        _owners.push(accounts[i]);
    }
    let _required = 2;
    describe('Execute Transaction Tests', function() {
        beforeEach(async () => {
            contract = await MultiSig.new(_owners, _required);
        });

        it('should return the count of pending transactions', async function() {
            const ether = 1;
            await contract.sendTransaction({from: accounts[1], value: web3.toWei(ether, 'ether')});
            await contract.submitTransaction(_beneficiary, web3.toWei(0.5, 'ether'), {
                from: _creator
            })

            await contract.submitTransaction(_beneficiary, web3.toWei(0.5, 'ether'), {
                from: _creator
            })

            await contract.confirmTransaction(0, {from: accounts[1]});
            let count = await contract.getTransactionCount(true, false);
            assert.equal(count.toNumber(), 1);
        })

        it('should return the count of executed transactions', async function() {
            const ether = 1;
            await contract.sendTransaction({from: accounts[1], value: web3.toWei(ether, 'ether')});
            await contract.submitTransaction(_beneficiary, web3.toWei(0.5, 'ether'), {
                from: _creator
            })

            await contract.submitTransaction(_beneficiary, web3.toWei(0.5, 'ether'), {
                from: _creator
            })

            await contract.confirmTransaction(0, {from: accounts[1]});
            let count = await contract.getTransactionCount(false, true);
            assert.equal(count.toNumber(), 1);
        })

        it('should return an array of pending transaction ids', async function() {
            const ether = 1;
            await contract.sendTransaction({from: accounts[1], value: web3.toWei(ether, 'ether')});
            for(let i = 0; i < 4; i++) {
                await contract.submitTransaction(_beneficiary, web3.toWei(0.1, 'ether'), {
                    from: _creator
                })
            }

            await contract.confirmTransaction(0, {from: accounts[1]});
            let txnIds = await contract.getTransactionIds(true, false);

            assert.equal(txnIds.length, 3);
        })

        it('should return an array of executed transaction ids', async function() {
            const ether = 1;
            await contract.sendTransaction({from: accounts[1], value: web3.toWei(ether, 'ether')});
            for(let i = 0; i < 4; i++) {
                await contract.submitTransaction(_beneficiary, web3.toWei(0.1, 'ether'), {
                    from: _creator
                })
            }

            await contract.confirmTransaction(0, {from: accounts[1]});
            let txnIds = await contract.getTransactionIds(false, true);

            assert.equal(txnIds.length, 1);
        })
      
        it('should get an array of owners', async function() {
            let owners = await contract.getOwners();

            assert.equal(_owners.length, owners.length)
        })
    });
});