const Investment = artifacts.require('Investment');

contract('Investment', (accounts) => {
    const owner = accounts[0];
    const investor = accounts[1];
    describe('After unlock time expires', () => {
        let contract;
        const unlockTime = 0;
        beforeEach(async () => {
            contract = await Investment.new(unlockTime, {
                from: owner,
            })

            await contract.invest({
                from: investor,
                value: 3,
            })
        })

        it('should allow approve after 7 days if not called by owner', async() => {
            await contract.approveWithdraw({
                from: investor,
            })
        })
    })

    describe('Before unlock time expires', () => {
        let contract;
        const value = 3;
        const unlockTime = 7;
        beforeEach(async () => {
            contract = await Investment.new(unlockTime, {
                from: owner,
            })

            await contract.invest({
                from: investor,
                value,
            })
        })

        it('should allow owner to approve withdraw', async() => {
            await expectNoThrow(
              contract.approveWithdraw({
                  from: owner,
              })
            )
        })

        it('should not allow others to approve withdraw', async() => {
            await expectThrow(
                contract.approveWithdraw({
                    from: investor,
                })
            )
        })

        it('should fail if withdraw is not approved', async() => {
            await expectThrow(
                contract.withdraw({
                    from: investor,
                })
            )
        })

        it('should only allow validInvestors to call withdraw', async() => {
            await contract.approveWithdraw({
                from: owner,
            })
            await expectThrow(
                contract.withdraw({
                    from: accounts[2]
                })
            )
        })

        it('should reduce overall token supply', async() => {
            const beginTokenSupply = await contract.tokens.call();

            await contract.approveWithdraw({
                from: owner,
            })

            await contract.withdraw({
                from: investor,
            })

            const tokenSupply = await contract.tokens.call();
            assert.equal(beginTokenSupply.toNumber() - (value * 5), tokenSupply.toNumber());
        })
    });

    describe('Properly write the withdraw function', async() => {
        let contract;
        const value = 3;
        const unlockTime = 7;
        const gasLimit = 51000;
        const investors = new Array(8).fill(undefined).map((_, idx) => accounts[idx + 2]);
        beforeEach(async () => {
            contract = await Investment.new(unlockTime, {
                from: owner,
            })

            investors.forEach(async(inv) => {
                await contract.invest({
                    from: inv,
                    value,
                })
            })
        })
        it('should not loop through investors', async() => {
            await contract.approveWithdraw({
                from: owner,
            })

            const gas = await contract.withdraw.estimateGas({from: investors[investors.length - 1]});
            assert(gas < gasLimit, 'Too much gas used! Try optimizing the withdraw function');
        })
    })

});

async function expectNoThrow(promise) {
    let exception;
    try {
      await promise;
    }
    catch(ex) {
      exception = ex;
    }
    assert(!exception, 'An unexpected exception occured');
}

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