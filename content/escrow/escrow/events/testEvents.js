const EscrowContract = artifacts.require('EscrowContract');
contract('EscrowContract', function (accounts) {
    let contract;
    let _depositor = accounts[0];
    let _arbiter = accounts[1];
    let _beneficiary = accounts[2];
    beforeEach(async () => {
        contract = await EscrowContract.new(_arbiter, _beneficiary, {
            from: _depositor,
            gasPrice: 0,
            value: web3.toBigNumber(web3.toWei('1', 'ether')),
        });
    });

    describe('Approve Stage tests', function () {
        it('should transfer balance to beneficiary', async function () {
            let balance = web3.eth.getBalance(_beneficiary);
            assert(balance > 0);
        });

        it('should log the Approved event', async function () {
            const transaction = await contract.approve({from: _arbiter});
            let approvedEvent = findEvent(transaction, 'Approved');
            assert(approvedEvent, 'Did not invoke an Approved Event');
        });

        it('should log the balance in the approved event', async function () {
            const transaction = await contract.approve({from: _arbiter});
            const approvedEvent = findEvent(transaction, 'Approved');
            const keys = Object.keys(approvedEvent);
            if (!keys.length) assert.fail('Expected a value to be logged in the Approved event');
            else {
                assert.equal(approvedEvent[keys[0]].toString(), web3.toBigNumber(web3.toWei('1', 'ether')).toString(), "Make sure to output the balance before it is transferred!");
            }
        });
    });

    describe('Fund Stage tests', function () {
        it('should be funded', async () => {
            let balance = await web3.eth.getBalance(contract.address);
            assert(balance > 0);
        });
    });

    describe('Constructor Stage tests', function () {
        it('should set an arbiter', async function () {
            let arbiter = await contract.arbiter.call();
            assert.deepEqual(arbiter, _arbiter);
        });

        it('should set an depositor', async function () {
            let depositor = await contract.depositor.call();
            assert.deepEqual(depositor, _depositor);
        });

        it('should set an beneficiary', async function () {
            let beneficiary = await contract.beneficiary.call();
            assert.deepEqual(beneficiary, _beneficiary);
        });
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

function findEvent(transaction, evt) {
    let event = transaction.logs.filter(({event}) => event === evt)[0];
    if (!event) throw new Error(`Remember to call ${evt} event!`);
    return event.args;
}