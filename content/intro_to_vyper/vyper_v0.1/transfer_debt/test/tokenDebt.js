const Token = artifacts.require('Token.vyper');

contract('Transfer', (accounts) => {
  let contract;
  const supply = 100;
  const [owner, account1, account2] = accounts;
  const transfer1 = 10;

  beforeEach(async () => {
    contract = await Token.new(supply, { from: owner });
  });

  describe('without having enough tokens', () => {
    it('should not allow account1 to transfer anything to account2', async () => {
      let exception;
      try {
        await contract.transfer(transfer1, account2, { from: account1 })
      }
      catch(e) {
        exception = e;
      }
      assert(exception, "It should have thrown an exception");
      assert(exception.toString().indexOf('revert') > -1, "The transaction should have reverted");
    });

    describe('after transferring account1 enough tokens', () => {
      beforeEach(async () => {
          await contract.transfer(transfer1, account1, { from: owner });
      });

      it('should allow account1 to transfer to account2', async () => {
        await contract.transfer(transfer1, account2, { from: account1 });
        const balance = await contract.balances.call(account2);
        assert.equal(balance, transfer1);
      });
    });
  });
});
