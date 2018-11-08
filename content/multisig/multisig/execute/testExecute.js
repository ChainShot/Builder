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

        it('should execute a transaction if confirmation threshold is met', async function() {
            const ether = 1;
            await contract.sendTransaction({from: accounts[1], value: web3.toWei(ether, 'ether')});
            await contract.submitTransaction(_beneficiary, web3.toWei(0.5, 'ether'), {
                from: _creator
            })

            await contract.confirmTransaction(0, {from: accounts[1]});
            await contract.executeTransaction(0, {from: accounts[1]});
            let txn = await contract.transactions.call(0);
            assert.equal(txn[2], true);
        })

        it('should not execute a transaction if confirmation threshold is not met', async function() {
            const ether = 1;
            await contract.sendTransaction({from: accounts[1], value: web3.toWei(ether, 'ether')});
            await contract.submitTransaction(_beneficiary, web3.toWei(0.5, 'ether'), {
                from: _creator
            })
            await expectThrow(
            	contract.executeTransaction(0, {from: _creator})
            );
        })

        it('should transfer funds to the beneficiary', async function() {
            const ether = 1;
            const transferAmount = 0.5;
            const balanceBefore = await parseFloat(web3.fromWei(web3.eth.getBalance(_testTransfer).toNumber(), 'ether'));
            const difference = (balanceBefore + transferAmount);
            await contract.sendTransaction({from: accounts[1], value: web3.toWei(ether, 'ether')});
            await contract.submitTransaction(_testTransfer, web3.toWei(transferAmount, 'ether'), {
                from: _creator
            })

            await contract.confirmTransaction(0, {from: accounts[1]});
            await contract.executeTransaction(0, {from: accounts[1]});
            const balance = await parseFloat(web3.fromWei(web3.eth.getBalance(_testTransfer).toNumber(), 'ether'));
            assert.equal(balance, difference);
        })

        it('should reduce funds from the wallet', async function() {
            const ether = 1;
            const transferAmount = 0.5;
            await contract.sendTransaction({from: accounts[1], value: web3.toWei(ether, 'ether')});
            const balanceBefore = await parseFloat(web3.fromWei(web3.eth.getBalance(contract.address).toNumber(), 'ether'));
            const difference = (balanceBefore - transferAmount);
            await contract.submitTransaction(_testTransfer, web3.toWei(transferAmount, 'ether'), {
                from: _creator
            })

            await contract.confirmTransaction(0, {from: accounts[1]});
            await contract.executeTransaction(0, {from: accounts[1]});
            const balance = await parseFloat(web3.fromWei(web3.eth.getBalance(contract.address).toNumber(), 'ether'));
            assert.equal(balance, difference);
        })
      
        it('should only allow valid owners to execute', async function() {
            const ether = 1;
            await contract.sendTransaction({from: accounts[1], value: web3.toWei(ether, 'ether')});
            await contract.submitTransaction(_beneficiary, web3.toWei(0.5, 'ether'), {
                from: _creator
            })
            await expectThrow(
                contract.executeTransaction(0, {from: accounts[6]})
            )
        })

        it('should only execute if confirmed by the sender', async function() {
            const ether = 1;
            await contract.sendTransaction({from: accounts[1], value: web3.toWei(ether, 'ether')});
            await contract.addTransaction(_beneficiary, web3.toWei(0.5, 'ether'), {
                from: _creator
            })
            await expectThrow(
                contract.executeTransaction(0, {from: _creator})
            )
        })

        it('should only execute transactions that are not already executed', async function() {
            const ether = 1;
            await contract.sendTransaction({from: accounts[1], value: web3.toWei(ether, 'ether')});
            await contract.submitTransaction(_beneficiary, web3.toWei(0.5, 'ether'), {
                from: _creator
            })

            await contract.confirmTransaction(0, {from: accounts[1]});
            await contract.executeTransaction(0, {from: accounts[1]});
            await expectThrow(
                contract.executeTransaction(0, {from: accounts[1]})
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