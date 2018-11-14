const Chipmunk = artifacts.require('Chipmunk');
const Stash = artifacts.require('Stash');
const Squirrel = artifacts.require('Squirrel');
contract('Stash', function (accounts) {
    let _stash;
    let _squirrel;
    let _chipmunk;
    const _squirrelDeposit = 1000;
    const _chipmunkDeposit = 250;
    let _creatorAccount = accounts[0];
    let _chipmunkAccount = accounts[1];
    let _squirrelAccount = accounts[2];

    before(async () => {
        _stash = await Stash.new({ from: _creatorAccount, gasPrice: 0 });
        _chipmunk = await Chipmunk.new(_stash.contract.address, { from: _chipmunkAccount, gasPrice: 0 });
        _squirrel = await Squirrel.new(_stash.contract.address, { from: _squirrelAccount, gasPrice: 0 });
    });

    describe('Squirrel Deposit', function() {
      before(async () => {
          await _squirrel.deposit({ from: _squirrelAccount, value: _squirrelDeposit });
      });

      it('should adjust the squirrel\'s balance', async function() {
          let balance = await _stash.balances.call(_squirrel.contract.address);
          assert.equal(balance.toNumber(), _squirrelDeposit, 'The Squirrel was unable to deposit their funds for crypto winter');
      });

      describe('Chipmunk Deposit', function() {
          before(async () => {
              await _chipmunk.deposit({ from: _chipmunkAccount, value: _chipmunkDeposit });
          });

          it('should adjust the chipmunk\'s balance', async function() {
              let balance = await _stash.balances.call(_chipmunk.contract.address);
              assert.equal(balance.toNumber(), _chipmunkDeposit, 'The Chipmunk could not deposit funds properly');
          });

          describe('Chipmunk Withdrawal', function() {
            before(async () => {
                await _chipmunk.withdraw({ from: _chipmunkAccount });
            });

            it('the chipmunk should have gotten their funds back', async function () {
                let balance = await web3.eth.getBalance(_chipmunk.contract.address);
                assert.isAtLeast(balance.toNumber(), _chipmunkDeposit, 'Huh, the attempted chipmunk didnt get their money back. Thats not fair.');
            });

            it('the chipmunk should not have gotten MORE funds back', async function() {
                let balance = await web3.eth.getBalance(_chipmunk.contract.address);
                assert.equal(balance.toNumber(), _chipmunkDeposit, 'Oh no! The chipmunk took the squirrels funds!');
            });
          });
      });
    })
});
