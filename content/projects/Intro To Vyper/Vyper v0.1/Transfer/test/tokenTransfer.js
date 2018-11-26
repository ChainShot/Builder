const Token = artifacts.require('Token.vyper');

contract('Transfer', (accounts) => {
  let contract;
  const supply = 100;
  const [owner, recipient1, recipient2] = accounts;
  const transfer1 = 10;
  const transfer12 = 20;
  const transfer2 = 20;

  beforeEach(async () => {
    contract = await Token.new(supply, { from: owner });
  });

  describe('after first transfer', () => {
    beforeEach(async () => {
      await contract.transfer(transfer1, recipient1, { from: owner });
    });

    it('should add to the first recipients balance', async () => {
      const balance = await contract.balances.call(recipient1);
      assert.equal(balance.toNumber(), transfer1);
    });

    it('should have been removed from the original owners balance', async () => {
      const balance = await contract.balances.call(owner);
      assert.equal(balance.toNumber(), supply - transfer1);
    });

    it('should not have affected the second recipients balance', async () => {
      const balance = await contract.balances.call(recipient2);
      assert.equal(balance.toNumber(), 0);
    });

    describe('after transferring more to the same recipient and another recipient', () => {
      beforeEach(async () => {
        await contract.transfer(transfer12, recipient1, { from: owner })
        await contract.transfer(transfer2, recipient2, { from: owner });
      });

      it('should have been removed from the original owners balance', async () => {
        const balance = await contract.balances.call(owner);
        assert.equal(balance.toNumber(), supply - transfer1 - transfer12 - transfer2);
      });

      it('should add the first recipients balance', async () => {
        const balance = await contract.balances.call(recipient1);
        assert.equal(balance.toNumber(), transfer1 + transfer12);
      });

      it('should add to the second recipients balance', async () => {
        const balance = await contract.balances.call(recipient2);
        assert.equal(balance.toNumber(), transfer2);
      });
    });
  });
});
