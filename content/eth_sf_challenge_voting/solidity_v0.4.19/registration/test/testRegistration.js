const Voting = artifacts.require('Voting');
const {expectThrow, expectNoThrow} = require('./testUtils');

contract('Voting', (accounts) => {
  const owner = accounts[0];
  let contract;

  beforeEach(async () => {
    contract = await Voting.new({ from: owner });
  });

  describe('without permission', () => {
    it('should throw an error for a voter', async () => {
      await expectThrow(contract.vote(true, { from: accounts[1] }));
    });
  });

  describe('registering a voter', () => {
    describe('by a non-owner', () => {
      it('should throw an error', async () => {
        await expectThrow(contract.register(accounts[1], { from: accounts[1] }));
      });
    });

    describe('by an owner', () => {
      const voter = accounts[1];
      const nonvoter = accounts[2];
      beforeEach(async () => {
        await contract.register(voter, { from: owner });
      });

      it('should not throw an error for a registered voter', async () => {
        await expectNoThrow(contract.vote(true, { from: voter }));
      });

      it('should throw an error for a non-registered voter', async () => {
        await expectThrow(contract.vote(true, { from: nonvoter }));
      });
    });
  });
});
