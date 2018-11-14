const Voting = artifacts.require('Voting');
const {expectThrow, expectNoThrow} = require('./testUtils');

contract('Voting', (accounts) => {
  const owner = accounts[0];
  let contract;

  beforeEach(async () => {
    contract = await Voting.new({ from: owner });
  });

  describe('looking up myVote', () => {
    describe('for a registered user', () => {
      const voter = accounts[1];
      beforeEach(async () => {
        await contract.register(voter, { from: owner });
      });

      describe('who voted positively', () => {
        beforeEach(async () => {
          await contract.vote(true, { from: voter });
        });

        it('should return true', async () => {
          const actual = await contract.myVote({ from: voter });
          assert.equal(actual.toNumber(), 1);
        });
      });

      describe('who voted negatively', () => {
        beforeEach(async () => {
          await contract.vote(false, { from: voter });
        });

        it('should return false', async () => {
          const actual = await contract.myVote({ from: voter });
          assert.equal(actual.toNumber(), 0);
        });
      });

      describe('who did not vote', () => {
        it('should return false', async () => {
          const actual = await contract.myVote({ from: voter });
          assert.equal(actual.toNumber(), -1);
        });
      });
    });
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

  describe('counting the number of votes', () => {
    describe('no votes', () => {
      it('should return zero', async () => {
        const actual = await contract.numberVotes();
        assert.equal(actual, 0);
      });
    });

    describe('three votes', () => {
      beforeEach(async () => {;
        for(let i = 1; i < 4; i++) {
          await contract.register(accounts[i], { from: owner });
          await contract.vote(!!(i % 2), { from: accounts[i] });
        }
      });

      it('should return a count of three', async () => {
        const actual = await contract.numberVotes();
        assert.equal(actual, 3);
      });
    });
  });
});
