const Party = artifacts.require('Party.vyper');

contract('Party', (accounts) => {
  describe('a two ether reservation charge', async () => {
    let contract;
    let owner = accounts[accounts.length - 1];

    beforeEach(async () => {
      contract = await Party.new(2 * 1e18, { from: owner });
    });

    describe('for four friends who pay exact', () => {
      let value = 2 * 1e18;
      let previousBalances = [];

      beforeEach(async () => {
        for(let i = 0; i < 4; i++) {
          const tx = await contract.rsvp({
            from: accounts[i],
            value,
          });
          previousBalances[i] = await web3.eth.getBalance(accounts[i]);
        }
      });

      describe('for an eight ether bill', async () => {
        beforeEach(async () => {
          await contract.payBill(8 * 1e18, { from: owner });
        });

        it('should refund nothing', async () => {
          for(let i = 0; i < 4; i++) {
            const balance = await web3.eth.getBalance(accounts[i]);
            assert.equal(balance.toNumber(), previousBalances[i]);
          }
        });
      });

      describe('for a four ether bill', async () => {
        beforeEach(async () => {
          await contract.payBill(4 * 1e18, { from: owner });
        });

        it('should only have cost one ether each', async () => {
          for(let i = 0; i < 4; i++) {
            const balance = await web3.eth.getBalance(accounts[i]);
            assert.equal(balance.toNumber(), previousBalances[i].toNumber() + (1 * 1e18));
          }
        });
      });
    });

    describe('for four friends who overpay the reservation by differing amounts', () => {
      let initialBalances = [];

      beforeEach(async () => {
        for(let i = 0; i < 4; i++) {
          initialBalances[i] = await web3.eth.getBalance(accounts[i]);
          const tx = await contract.rsvp({
            from: accounts[i],
            value: 2 * 1e18 + (i * 1e18)
          });
        }
      });

      describe('and one friend who does not pay enough', async () => {
        let friend = accounts[5];
        let previousBalance;
        let gasCost;

        beforeEach(async () => {
          previousBalance = await web3.eth.getBalance(friend).toNumber();
          const tx = await contract.rsvp({
            from: friend,
            value: 1.5 * 1e18
          });
          gasCost = tx.receipt.gasUsed * 1e11;
        });

        it('should not accept their RSVP', async () => {
          const balance = await web3.eth.getBalance(friend);
          assert.equal(previousBalance - gasCost, balance.toNumber());
        });
      });

      describe('for an eight ether bill', async () => {
        beforeEach(async () => {
          await contract.payBill(8 * 1e18, { from: owner });
        });

        it('should only cost 2 ether each', async () => {
          for(let i = 0; i < 4; i++) {
            const balance = await web3.eth.getBalance(accounts[i]);
            compareEth(balance.toNumber(), initialBalances[i].toNumber() - (2 * 1e18));
          }
        });
      });

      describe('for an two ether bill', async () => {
        beforeEach(async () => {
          await contract.payBill(2 * 1e18, { from: owner });
        });

        it('should only cost .5 ether each', async () => {
          for(let i = 0; i < 4; i++) {
            const balance = await web3.eth.getBalance(accounts[i]);
            compareEth(balance.toNumber(), initialBalances[i].toNumber() - (.5 * 1e18));
          }
        });
      });
    });
  });
});

function compareEth(a, b) {
  assert.equal(Math.round(a / 1e18), Math.round(b / 1e18));
}
