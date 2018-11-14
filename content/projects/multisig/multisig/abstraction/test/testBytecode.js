const MultiSig = artifacts.require('MultiSig');
const EIP20 = artifacts.require('EIP20');

contract('MultiSig', function(accounts) {
    let contract;
    let token;
    let owner = accounts[0];
    let destination = accounts[1];

    beforeEach(async () => {
        contract = await MultiSig.new([owner, destination], 1);
    });

    describe('storing ERC20 tokens', function() {
      const initialBalance = 10000;

      beforeEach(async () => {
        token = await EIP20.new(initialBalance, 'My Token', 1, 'MT', { from: owner });
        await token.transfer(contract.address, initialBalance, { from: owner });
      });

      it('should store the balance', async () => {
        const balance = await token.balanceOf(contract.address);
        assert.equal(balance.toNumber(), initialBalance);
      });

      describe('executing an ERC20 transaction',  function() {
        beforeEach(async () => {
          const data = token.contract.transfer.getData(destination, initialBalance);
          await contract.submitTransaction(token.address, 0, data, { from: owner });
        });

        it('should have removed the contract balance', async () => {
          const balance = await token.balanceOf(contract.address);
          assert.equal(balance.toNumber(), 0);
        });

        it('should have moved the balance to the destination', async () => {
          const balance = await token.balanceOf(destination);
          assert.equal(balance.toNumber(), initialBalance);
        });
      });
    });

    describe('storing ether', function() {
      beforeEach(async () => {
        await contract.sendTransaction({from: owner, value: web3.toWei(1, 'ether')});
      });

      it('should store the balance', async () => {
        const balance = await web3.eth.getBalance(contract.address);
        assert.equal(balance.toNumber(), web3.toWei(1, 'ether'));
      });

      describe('executing the ether transaction', function() {
        let balanceBefore;

        beforeEach(async () => {
          balanceBefore = await web3.eth.getBalance(destination);
          await contract.submitTransaction(destination, web3.toWei(1, 'ether'), 0, { from: owner });
        });

        it('should have removed the contract balance', async () => {
          const balance = await web3.eth.getBalance(contract.address);
          assert.equal(balance.toNumber(), 0);
        });

        it('should have moved the balance to the destination', async () => {
          const balance = await web3.eth.getBalance(destination);
          assert.equal(balance.toNumber() - balanceBefore, web3.toWei(1, 'ether'));
        });
      });
    });
});
